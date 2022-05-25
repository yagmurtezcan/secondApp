import express from "express";
import IRouterBase from "../interface/IRouter";
import userService from "../service/UserService";
import * as schemas from "../validator/userValidator";
import User from "../interface/IUser";
import UserDetail from "../interface/RequestUserDetail";

class UserController implements IRouterBase {
  router: express.Router;

  constructor() {
    this.router = express.Router();
    this.routes();
  }

  getAllUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    userService.getAllUser().then((users: User[]) => {
      res.status(200).json({
        status_code: 1,
        message: "Operation Completed",
        data: users
      })
    }).catch((err: Error) => {
      next(err)
    })
  }

  createUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    const user: User = req.body;

    schemas.default.create.validateAsync(user).then((resultValue: User) => {
      userService.createUser(resultValue).then((response: User) => {
            return res.status(200).json({
              status_code: 1,
              message: "Operation Completed",
              data: response
            });
          }).catch((err: Error) => {
            next(err);
          });
    }).catch((err: Error) => {
        next(err);
      });
  }

  getUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    const userInfo: UserDetail = {id: req.params.id}

    schemas.default.detail.validateAsync(userInfo).then((userId: UserDetail) => {
      userService.getUser(userId.id).then((response: User) => {
        return res.status(200).json({
          status_code: 1,
          message: "Operation Completed",
          data: response
        });
      }).catch((err: Error) => {
        next(err)
      })
    }).catch((err: Error) => {
      next(err)
    })
  }

  updateUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    const userInfo: UserDetail = {id: req.params.id}

    schemas.default.detail.validateAsync(userInfo).then((userId: UserDetail) =>{
      let updateReqUser: User = req.body;
      userService.updateUser(updateReqUser, userId).then((user: User) => {
        res.status(200).json({
          status_code: 1,
          message: "Operation Completed",
          data: user
        })
      }).catch((err: Error) => {
        next(err)
      })
    }).catch((err: Error) => {
      next(err)
    })
  }

  deleteUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    const userInfo: UserDetail = {id: req.params.id}

    schemas.default.detail.validateAsync(userInfo).then((userId: UserDetail) => {
      userService.deleteUser(userId.id).then((response: User) => {
        return res.status(200).json({
          status_code: 1,
          message: "Operation Completed"
        })
      }).catch((err: Error) => {
        next(err)
      })
    }).catch((err: Error) => {
      next(err)
    })
  }

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
