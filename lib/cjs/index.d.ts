import { HTTPRequestContext } from "rjweb-server";
import ejs from "ejs";
declare const init: (config?: ejs.Options) => {
    data: import("rjweb-server/lib/cjs/classes/middlewareBuilder").MiddlewareData<ejs.Options, {
        options: ejs.Options;
    }>;
    config: ejs.Options;
    version: number;
    localContext: {
        options: ejs.Options;
    };
};
export { init };
export interface Props {
    /** Print a Rendered EJS Template File to the Client */ printEJS: (file: string, data?: ejs.Data, options?: ejs.Options) => HTTPRequestContext;
}
/** @ts-ignore */
export { version as Version } from "./pckg.json";
