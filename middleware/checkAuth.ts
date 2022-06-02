import express from "express"
import jwt from "jsonwebtoken"
import config from "../config"
import userRepository from "../repository/userRepository"
import { TokenRequest } from "../tokenRequest"


async function verifyToken(req: TokenRequest, res: express.Response, next: express.NextFunction): Promise<void> {
    const token = req.headers.authorization?.split(" ")[1] as string

    if(token){
        jwt.verify(token, config.secret_key, (error: any, decoded: any) => {
            if(error) next("token not found")
            else if(decoded) {
                userRepository.checkUserActivity(decoded.user.id).then(() => {
                    req.user = decoded.user
                    next()
                }).catch((err: Error) => {
                    next(err)
                })
            }
        })
    } else {
        next("token not found")
    }

}


export default verifyToken




