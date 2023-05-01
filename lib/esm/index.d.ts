import { HttpRequest } from "rjweb-server";
import ejs from "ejs";
declare class Http extends HttpRequest {
    /**
     * Print an EJS File to the Client
     * @since 1.3.0
     * @from rjweb-server-ejs
    */ printEJS(file: string, data?: ejs.Data, options?: ejs.Options): this;
}
export declare const eJS: import("rjweb-server/lib/typings/classes/middlewareBuilder").MiddlewareLoader<{}, ejs.Options, typeof Http, {
    new (): {};
}, {
    new (): {};
}, {
    new (): {};
}>;
export declare const Version: string;
export {};
