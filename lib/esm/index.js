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
          ctx.content = Buffer.from(await ejs.render(content, data, {
            beautify: false,
            ...defaultOptions,
            ...options,
            async: true
          }));
          ctx.events.emit("noWaiting");
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
