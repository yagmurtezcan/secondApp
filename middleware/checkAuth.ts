import express from "express"
import jwt, { TokenExpiredError } from "jsonwebtoken"
import config from "../config"
import userRepository from "../repository/userRepository"
import { TokenNotFoundException } from "../src/common/http.exception"
import { TokenRequest } from "../tokenRequest"

async function verifyToken(req: TokenRequest, res: express.Response, next: express.NextFunction): Promise<void> {
    const token = req.headers.authorization?.split(" ")[1] as string

    if(token){
        jwt.verify(token, config.secret_key, (error: any, decoded: any) => {
            if(error) next(new TokenNotFoundException())
            else if(decoded) {
                userRepository.checkUserActivity(decoded.email).then((activeUser) => {
                    req.user = activeUser
                    next()
                }).catch((err: Error) => {
                    next(err)
                })
            }
        })
    } else {
        next(new TokenNotFoundException())
    }
}

export default verifyToken