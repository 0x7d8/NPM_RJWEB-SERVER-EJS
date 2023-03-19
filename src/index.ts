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
				ctx.waiting = true; (async() => {
					const content = await fs.promises.readFile(path.resolve(file), 'utf8')

					try {
						ctx.content = Buffer.from(await ejs.render(content, data, {
							beautify: false,
							root: path.dirname(file),
							...defaultOptions,
							...options,
							async: true
						}))

						ctr.setHeader('Content-Type', 'text/html')
						ctx.events.emit('noWaiting')
					} catch (err) {
						ctx.handleError(err)
					}
				}) ()

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