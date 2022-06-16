import express from "express"
import * as http from "http";
import basketController from "./controller/basketController";
import fileUploadController from "./controller/fileUploadController";
import loginController from "./controller/loginController";
import productController from "./controller/productController";
import userController from "./controller/userController";
import knexDB from "./db/knex";
import errorHandler from "./middleware/errorHandler";

export class YApp {
  app: express.Application;
  appRouter: express.Router;
  server: http.Server;
  port : 3000;

  constructor() {
    this.app = express();
    this.appRouter = express.Router();
    this.server = new http.Server;
    this.init();
    this.port = 3000
  }

  init() {
    return new Promise((resolve, rejects) => {
      try {
        this.app.use(express.json({limit: "3mb"}));
        this.app.use(express.urlencoded({extended: false}));
        
    
        this.app.use("/", this.appRouter);
        this.appRouter.use("/user", userController);
        this.appRouter.use("/product", productController);
        this.appRouter.use("/", basketController);
        this.appRouter.use("/login", loginController)
        this.appRouter.use("/", fileUploadController)
    
        this.server = http.createServer(this.app);
        this.server.on("error", (err: Error)=> {
          process.exit(2);
        })
    
        this.server.listen(3000, ()=> {
          console.log(`Server is running on ${this.port}`);
        })
    
        knexDB.init()
        
      } catch (error) {
        console.log(error)
      }finally {
        this.app.use(errorHandler)
      }
    })
  }
}

const app = new YApp();
export default app;