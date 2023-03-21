import { HTTPRequestContext, Middleware, MiddlewareToProps } from "rjweb-server"
type HTTPRequestContextFull = HTTPRequestContext & MiddlewareToProps<[ Props ]>

import path from "path"
import ejs from "ejs"
import fs from "fs"

export function Init(defaultOptions: ejs.Options = {}): Middleware {
	return {
		name: 'rjweb-server-ejs',

		code: (ctr: HTTPRequestContextFull, ctx) => {
			ctr.printEJS = (file, data = {}, options = {}) => {
				ctx.scheduleQueue('execution', () => new Promise<void>(async(resolve, reject) => {
					const content = await fs.promises.readFile(path.resolve(file), 'utf8')

					try {
						ctx.response.content = Buffer.from(await ejs.render(content, data, {
							beautify: false,
							root: path.dirname(file),
							...defaultOptions,
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
		}
	}
}

export interface Props {
	/** Print a Rendered EJS Template File to the Client */ printEJS: (file: string, data?: ejs.Data, options?: ejs.Options) => HTTPRequestContext
}

/** @ts-ignore */
export { version as Version } from "./pckg.json"