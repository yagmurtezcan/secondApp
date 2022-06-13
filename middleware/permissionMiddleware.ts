import express, { NextFunction } from "express"
import { UnAutorizedPerson } from "../src/common/http.exception"

function permissonMiddleware(permission: any) {
    return (req: express.Request, res: express.Response, next: NextFunction) => {
        const userRole = req.user.role

        if(permission.includes(userRole)) {
            next()
        } else {
            next(new UnAutorizedPerson("You dont have permission"))
        }
    }
}

export default permissonMiddleware