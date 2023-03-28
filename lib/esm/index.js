import { MiddlewareBuilder } from "rjweb-server";
import path from "path";
import ejs from "ejs";
import fs from "fs";
const { init } = new MiddlewareBuilder().init((lCtx, config) => {
  lCtx.options = config;
}).http((lCtx, stop, ctr, ctx) => {
  ctr.printEJS = (file, data = {}, options = {}) => {
    ctx.scheduleQueue("execution", () => new Promise(async (resolve, reject) => {
      const content = await fs.promises.readFile(path.resolve(file), "utf8");
      try {
        ctx.response.content = Buffer.from(await ejs.render(content, data, {
          beautify: false,
          root: path.dirname(file),
          ...lCtx.options,
          ...options,
          async: true
        }));
        ctr.setHeader("Content-Type", "text/html");
        resolve();
      } catch (err) {
        reject(err);
      }
    }));
    return ctr;
  };
}).build();
import { version } from "./pckg.json";
export {
  version as Version,
  init
};
