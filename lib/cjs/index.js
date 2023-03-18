var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var src_exports = {};
__export(src_exports, {
  Init: () => Init,
  Version: () => import_pckg.version
});
module.exports = __toCommonJS(src_exports);
var import_path = __toESM(require("path"));
var import_ejs = __toESM(require("ejs"));
var import_fs = __toESM(require("fs"));
var import_pckg = require("./pckg.json");
function Init() {
  return {
    name: "rjweb-server-ejs",
    code: (ctr, ctx) => {
      ctr.printEJS = (file, data = {}, options = {}) => {
        ctx.waiting = true;
        (async () => {
          const content = await import_fs.default.promises.readFile(import_path.default.resolve(file), "utf8");
          ctx.content = Buffer.from(await import_ejs.default.render(content, data, {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Init,
  Version
});
