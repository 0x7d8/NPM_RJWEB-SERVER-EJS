"use strict";
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
  Version: () => Version,
  eJS: () => eJS
});
module.exports = __toCommonJS(src_exports);
var import_rjweb_server = require("rjweb-server");
var import_path = __toESM(require("path"));
var import_ejs = __toESM(require("ejs"));
var import_fs = __toESM(require("fs"));
var import_pckg = require("./pckg.json");
class Http extends import_rjweb_server.HttpRequest {
  /**
   * Print an EJS File to the Client
   * @since 1.3.0
   * @from rjweb-server-ejs
  */
  printEJS(file, data = {}, options = {}) {
    this.ctx.setExecuteSelf(() => new Promise(async (resolve, reject) => {
      const content = await import_fs.default.promises.readFile(import_path.default.resolve(file), "utf8");
      try {
        this.ctx.response.content = await import_ejs.default.render(content, data, {
          beautify: false,
          root: import_path.default.dirname(file),
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
const eJS = new import_rjweb_server.MiddlewareBuilder().init((lCtx, config) => {
  globalOptions = config;
}).httpClass(() => Http).build();
const Version = import_pckg.version;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Version,
  eJS
});
