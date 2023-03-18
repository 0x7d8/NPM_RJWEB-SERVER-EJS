import path from "path";
import ejs from "ejs";
import fs from "fs";
function Init() {
  return {
    name: "rjweb-server-ejs",
    code: (ctr, ctx) => {
      ctr.printEJS = (file, data = {}, options = {}) => {
        ctx.waiting = true;
        (async () => {
          const content = await fs.promises.readFile(path.resolve(file), "utf8");
          ctx.content = Buffer.from(await ejs.render(content, data, {
            async: true,
            beautify: false,
            ...options
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
