import { HTTPRequestContext, Middleware, MiddlewareToProps } from "rjweb-server"
type HTTPRequestContextFull = HTTPRequestContext & MiddlewareToProps<[ Props ]>

import path from "path"
import ejs from "ejs"
import fs from "fs"

export function Init(): Middleware {
  return {
    name: 'rjweb-server-ejs',

    code: (ctr: HTTPRequestContextFull, ctx) => {
      ctr.printEJS = (file, data = {}, options = {}) => {
        ctx.waiting = true; (async() => {
          const content = await fs.promises.readFile(path.resolve(file), 'utf8')

          ctx.content = Buffer.from(await ejs.render(content, data, {
            async: true,
            beautify: false,
            ...options
          }))

          ctx.events.emit('noWaiting')
        })()

        return ctr
      }
    }
  }
}

export interface Props {
  printEJS: (file: string, data?: ejs.Data, options?: ejs.Options) => HTTPRequestContext
}

/** @ts-ignore */
export { version as Version } from "./pckg.json"