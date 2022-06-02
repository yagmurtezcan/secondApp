import {Request} from "express"
import TokenUser from "./interface/IToken";


export interface TokenRequest extends Request {
    user: TokenUser
}