import { MiddlewareBuilder } from "rjweb-server"

import path from "path"
import ejs from "ejs"
import fs from "fs"

const handleRootFile = async(root: Options['root'] = '.', file: string): Promise<string> => {
	if (typeof root === 'string') return path.join(root, file)
	else {
		let result = path.join(root[root.length - 1], file)

		for (const rootPath in root) {
			const realPath = path.join(rootPath, file)
			try {
				await fs.promises.access(realPath, fs.constants.R_OK)

				result = realPath
				break
			} catch {
				continue
			}
		}

		return result
	}
}

type Options = ejs.Options & {
	/**
	 * Apply root from config to initial file path
	 * @default false
	*/ rootFilePath?: boolean
}

export const eJS = new MiddlewareBuilder<Options, { config: Options }>()
	.init((lCtx, config) => {
		lCtx.config = config
	})
	.httpClass((e, lCtx) => class Http extends e {
		/**
		 * Print an EJS File to the Client
		 * @since 1.3.0
		 * @from rjweb-server-ejs
		*/ public printEJS(file: string, data: ejs.Data = {}, options: ejs.Options = {}): this {
			this.ctx.setExecuteSelf(() => new Promise(async(resolve, reject) => {
				try {
					const config: ejs.Options = {
						beautify: false,
						root: path.dirname(file),
						...lCtx.config,
						...options,
						rmWhitespace: true,
						async: true
					}

					let location = file
					if (lCtx.config.rootFilePath) location = await handleRootFile(config.root, file)
					this.ctx.response.content = await ejs.renderFile(location, data, config)

					this.headers.set('Content-Type', 'text/html')
					resolve(true)
				} catch (err) {
					reject(err)
				}
			}))

			return this
		}
	})
	.build()

/** @ts-ignore */
import { version } from "./pckg.json"
export const Version: string = version