import { HTTPRequestContext, MiddlewareBuilder, MiddlewareToProps } from "rjweb-server"
type HTTPRequestContextFull = HTTPRequestContext & MiddlewareToProps<[ Props ]>

import path from "path"
import ejs from "ejs"
import fs from "fs"

const { init } = new MiddlewareBuilder<ejs.Options, { options: ejs.Options }>()
	.init((lCtx, config) => {
		lCtx.options = config
	})
	.http((lCtx, stop, ctr: HTTPRequestContextFull, ctx) => {
		ctr.printEJS = (file, data = {}, options = {}) => {
			ctx.scheduleQueue('execution', () => new Promise<void>(async(resolve, reject) => {
				const content = await fs.promises.readFile(path.resolve(file), 'utf8')

				try {
					ctx.response.content = Buffer.from(await ejs.render(content, data, {
						beautify: false,
						root: path.dirname(file),
						...lCtx.options,
						...options,
						async: true
					}))

					ctr.setHeader('Content-Type', 'text/html')
					resolve()
				} catch (err) {
					reject(err)
				}
			}))

			return ctr
		}
	})
	.build()

export { init } 

export interface Props {
	/** Print a Rendered EJS Template File to the Client */ printEJS: (file: string, data?: ejs.Data, options?: ejs.Options) => HTTPRequestContext
}

/** @ts-ignore */
export { version as Version } from "./pckg.json"