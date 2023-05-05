import { HttpRequest, MiddlewareBuilder } from "rjweb-server";
import path from "path";
import ejs from "ejs";
import fs from "fs";
class Http extends HttpRequest {
  /**
   * Print an EJS File to the Client
   * @since 1.3.0
   * @from rjweb-server-ejs
  */
  printEJS(file, data = {}, options = {}) {
    this.ctx.setExecuteSelf(() => new Promise(async (resolve, reject) => {
      const content = await fs.promises.readFile(path.resolve(file), "utf8");
      try {
        this.ctx.response.content = await ejs.render(content, data, {
          beautify: false,
          root: path.dirname(file),
          ...globalOptions,
          ...options,
          async: true
        });
        this.setHeader("Content-Type", "text/html");
        resolve(true);
      } catch (err) {
        reject(err);
      }
    }));
    return this;
  }
}
let globalOptions = {};
const eJS = new MiddlewareBuilder().init((lCtx, config) => {
  globalOptions = config;
}).httpClass(() => Http).build();
import { version } from "./pckg.json";
const Version = version;
export {
  Version,
  eJS
};
