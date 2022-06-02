import express from "express";
import TokenUser from "./IToken";

export default interface IRouterBase {
    router: express.Router;
    routes(): any;
}

declare global {
    namespace Express {
        interface Request {
            user: TokenUser
        }
    }
}

