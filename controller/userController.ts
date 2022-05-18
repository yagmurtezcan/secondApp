import express, { response } from "express";
import IRouterBase from "./IRouter";
import userService from "../service/UserService";
import * as schemas from "../validator/userValidator";
import User from "./IUser";

class UserController implements IRouterBase {
  router: express.Router;
  users: User[] = [];
  userId: string;

  constructor() {
    this.router = express.Router();
    this.routes();
    this.users = [];
    this.userId = "";
  }

  getAllUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    res.status(200).send(this.users);
  }

  createUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user: User = req.body;

    schemas.default.list
      .validateAsync(user)
      .then((resultValue: User) => {
        userService
          .createUser(resultValue)
          .then((response: User) => {
            return res.status(200).send(response);
          })
          .catch((err: Error) => {
            next(err);
          });
      })
      .catch((err) => {
        next(err);
      });
  }

  getUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    let userId = req.params.id;
    let foundUserId = userService.getUser(userId);

    foundUserId
      .then((response: User) => {
        return res.status(200).send(response);
      })
      .catch((err: Error) => {
        next(err);
      });
  }

  updateUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    let userId = req.params.id;

    let foundUserId = userService.getUser(userId);
    foundUserId
      .then((response: User) => {
        let updateReqUser: User = req.body;
        schemas.default.list
          .validateAsync(updateReqUser)
          .then((resultValue) => {
            userService
              .updateUser(resultValue)
              .then((response) => {
                return res.status(200).send(response);
              })
              .catch((err: Error) => {
                next(err);
              });
          })
          .catch((err: Error) => {
            next(err);
          });
      })
      .catch((err: Error) => {
        next(err);
      });
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
