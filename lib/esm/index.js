import path from "path";
import ejs from "ejs";
import fs from "fs";
function Init(defaultOptions = {}) {
  return {
    name: "rjweb-server-ejs",
    code: (ctr, ctx) => {
      ctr.printEJS = (file, data = {}, options = {}) => {
        ctx.waiting = true;
        (async () => {
          const content = await fs.promises.readFile(path.resolve(file), "utf8");
          try {
            ctx.content = Buffer.from(await ejs.render(content, data, {
              beautify: false,
              root: path.dirname(file),
              ...defaultOptions,
              ...options,
              async: true
            }));
            ctr.setHeader("Content-Type", "text/html");
            ctx.events.emit("noWaiting");
          } catch (err) {
            ctx.handleError(err);
          }
        })();
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
