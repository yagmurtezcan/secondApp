import express from "express"
import IRouterBase from "../interface/IRouter"
import User from "../interface/IUser"
import loginService from "../service/loginService"
import * as schemas from "../validator/loginValidator"

class LoginController implements IRouterBase {
    router: express.Router

    constructor() {
        this.router = express.Router();
        this.routes();
    }

    login(req: express.Request, res: express.Response, next: express.NextFunction){
        const user: User = req.body
        
        schemas.default.login.validateAsync(user).then((validatedReq: User) => {
            loginService.login(validatedReq).then((token) => {
                res.status(200).json({
                    status_code: 1,
                    message: "Operation Completed",
                    token: token
                })
            }).catch((err: Error) => {
                next(err)
            })
        }).catch((err: Error) => {
            next(err)
        })
    }

    routes() {
        this.router.post("/", this.login.bind(this))
    }
}

const loginController = new LoginController
export default loginController.router