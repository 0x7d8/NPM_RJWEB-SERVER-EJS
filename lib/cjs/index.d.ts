import { HTTPRequestContext, Middleware } from "rjweb-server";
import ejs from "ejs";
export declare function Init(defaultOptions?: ejs.Options): Middleware;
export interface Props {
    /** Print a Rendered EJS Template File to the Client */ printEJS: (file: string, data?: ejs.Data, options?: ejs.Options) => HTTPRequestContext;
}
/** @ts-ignore */
export { version as Version } from "./pckg.json";
