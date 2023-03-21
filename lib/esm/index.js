import path from "path";
import ejs from "ejs";
import fs from "fs";
function Init(defaultOptions = {}) {
  return {
    name: "rjweb-server-ejs",
    code: (ctr, ctx) => {
      ctr.printEJS = (file, data = {}, options = {}) => {
        ctx.scheduleQueue("execution", () => new Promise(async (resolve, reject) => {
          const content = await fs.promises.readFile(path.resolve(file), "utf8");
          try {
            ctx.response.content = Buffer.from(await ejs.render(content, data, {
              beautify: false,
              root: path.dirname(file),
              ...defaultOptions,
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
    }
  };
}
import { version } from "./pckg.json";
export {
  Init,
  version as Version
};
