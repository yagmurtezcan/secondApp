import express from "express";
import IRouterBase from "./IRouter";
import userService from "../service/UserService";
import * as schemas from "../validator/userValidator";
import User from "./IUser";
import UserDetail from "../interface/RequestUserDetail";

class UserController implements IRouterBase {
  router: express.Router;
  // users: User[] = [];

  constructor() {
    this.router = express.Router();
    this.routes();
    // this.users = [];
  }

  getAllUser( req: express.Request, res: express.Response, next: express.NextFunction) {
    userService.getAllUser().then((users: User[]) => {
      res.status(200).send(users);
    }).catch((err: Error) => {
      next(err)
    })
  }

  createUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    const user: User = req.body;

    schemas.default.create.validateAsync(user).then((resultValue: User) => {
      userService.createUser(resultValue).then((response: User) => {
            return res.status(200).send(response);
          }).catch((err: Error) => {
            next(err);
          });
    }).catch((err: Error) => {
        next(err);
      });
  }

  getUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    const userInfo: UserDetail = {id: req.params.id}
    schemas.default.detail.validateAsync(userInfo).then((resultValue: UserDetail) => {
      userService.getUser(resultValue.id).then((response: User) => {
        return res.status(200).send(response);
      }).catch((err: Error) => {
        next(err)
      })
    }).catch((err: Error) => {
      next(err)
    })
  }

  updateUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    let userId = req.params.id; // useer id dolu old emin olalım.
    let updateReqUser: User = req.body;
    userService.updateUser(updateReqUser, userId).then((user: User) => {
      res.status(200).send(user)
    }).catch((err: Error) => {
      next(err)
    })

    
   
  }

  deleteUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {}

  routes() {
    this.router.get("/", this.getAllUser.bind(this));
    this.router.post("/", this.createUser.bind(this));
    this.router.get("/:id", this.getUser.bind(this));
    this.router.put("/:id", this.updateUser.bind(this));
    this.router.delete("/:id", this.deleteUser.bind(this));
  }
}

const userController = new UserController();
export default userController.router;
