import { HTTPRequestContext, Middleware } from "rjweb-server";
import ejs from "ejs";
export declare function Init(): Middleware;
export interface Props {
    printEJS: (file: string, data?: ejs.Data, options?: ejs.Options) => HTTPRequestContext;
}
/** @ts-ignore */
export { version as Version } from "./pckg.json";
