import express from "express";
import IRouterBase from "../interface/IRouter";
import userService from "../service/UserService";
import * as schemas from "../validator/userValidator";
import User from "../interface/IUser";
import UserDetail from "../interface/RequestUserDetail";
import checkAuth from "../middleware/checkAuth"
import upload from "../middleware/uploadProfilePhoto";
import OperationCompleted from "../src/common/http.response";

class UserController implements IRouterBase {
  router: express.Router;

  constructor() {
    this.router = express.Router();
    this.routes();
  }

  getAllUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    userService.getAllUser().then((users: OperationCompleted) => {
      res.status(200).send(users)
    }).catch((err: Error) => {
      next(err)
    })
  }

  createUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    const user: User = req.body;

    schemas.default.create.validateAsync(user).then((resultValue: User) => {
      userService.createUser(resultValue).then((response: OperationCompleted) => {
            res.status(200).send(response)
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
      userService.updateUser(updateReqUser, userId.id).then((user: User) => {
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
      userService.deleteUser(userId.id).then((response: number) => {
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
    this.router.get("/", checkAuth, this.getAllUser.bind(this));
    this.router.post("/", upload.single("image"), this.createUser.bind(this));
    this.router.get("/:id", checkAuth, this.getUser.bind(this));
    this.router.put("/:id", checkAuth, this.updateUser.bind(this));
    this.router.delete("/:id", checkAuth, this.deleteUser.bind(this));
  }
}

const userController = new UserController();
export default userController.router;