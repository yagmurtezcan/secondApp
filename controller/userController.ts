import { v4 as uuid } from "uuid";
import express from "express";
import IRouterBase from "./IRouter";
import userService from "../service/UserService"
import * as schemas from "../validator/userValidator";


class UserController implements IRouterBase {
  router: express.Router;
  users : any[] = []
  

  constructor() {
    this.router = express.Router();
    this.routes();
    this.users = []
  }

  getAllUser(req : express.Request , res : express.Request , next : express.NextFunction){

    // res.send()
  }
   

  createUser(req: express.Request, res: express.Response, next: express.NextFunction){
    const user = req.body;
    schemas.default.list.validateAsync(user).then(resultValue => {
      
      userService.createUser(resultValue)
      return res.status(200).send(resultValue);
      
    }).catch(err => {
      next(err);
    });
  }

  getUser(req : express.Request , res : express.Response , next : express.NextFunction){
    // const userId = req.params.id
    // const foundUser = this.users.find((user) => user.id === userId)
    // res.send(foundUser)
  }

  updateUser(req : express.Request , res : express.Response , next : express.NextFunction){

  }

  deleteUser(req : express.Request , res : express.Response , next : express.NextFunction){

  }

  routes() {
    this.router.get("/" , this.getAllUser.bind)
    this.router.post("/", this.createUser.bind(this))
    this.router.get("/:id" , this.getUser.bind(this))
    this.router.put("/:id" , this.updateUser.bind(this))
    this.router.delete("/:id" , this.deleteUser.bind(this))
  }
}

const userController = new UserController();
export default userController.router;
