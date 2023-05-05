import { HttpRequest, MiddlewareBuilder } from "rjweb-server"

import path from "path"
import ejs from "ejs"
import fs from "fs"

class Http extends HttpRequest {
	/**
	 * Print an EJS File to the Client
	 * @since 1.3.0
	 * @from rjweb-server-ejs
	*/ public printEJS(file: string, data: ejs.Data = {}, options: ejs.Options = {}): this {
		this.ctx.setExecuteSelf(() => new Promise(async(resolve, reject) => {
			const content = await fs.promises.readFile(path.resolve(file), 'utf8')

			try {
				this.ctx.response.content = await ejs.render(content, data, {
					beautify: false,
					root: path.dirname(file),
					...globalOptions,
					...options,
					async: true
				})

				this.setHeader('Content-Type', 'text/html')
				resolve(true)
			} catch (err) {
				reject(err)
			}
		}))

		return this
	}
}

let globalOptions: ejs.Options = {}
export const eJS = new MiddlewareBuilder<{}, ejs.Options>()
	.init((lCtx, config) => {
		globalOptions = config
	})
	.httpClass(() => Http)
	.build()

/** @ts-ignore */
import { version } from "./pckg.json"
export const Version: string = version