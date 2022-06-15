"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YApp = void 0;
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const basketController_1 = __importDefault(require("./controller/basketController"));
const fileUploadController_1 = __importDefault(require("./controller/fileUploadController"));
const loginController_1 = __importDefault(require("./controller/loginController"));
const productController_1 = __importDefault(require("./controller/productController"));
const userController_1 = __importDefault(require("./controller/userController"));
const knex_1 = __importDefault(require("./db/knex"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const XmlReader = require("xml-reader");
class YApp {
    constructor() {
        this.app = (0, express_1.default)();
        this.appRouter = express_1.default.Router();
        this.server = new http.Server;
        this.init();
        this.port = 3000;
    }
    init() {
        return new Promise((resolve, rejects) => {
            try {
                this.app.use(express_1.default.json({ limit: "3mb" }));
                this.app.use(express_1.default.urlencoded({ extended: false }));
                this.app.use("/", this.appRouter);
                this.appRouter.use("/user", userController_1.default);
                this.appRouter.use("/product", productController_1.default);
                this.appRouter.use("/", basketController_1.default);
                this.appRouter.use("/login", loginController_1.default);
                this.appRouter.use("/", fileUploadController_1.default);
                this.server = http.createServer(this.app);
                this.server.on("error", (err) => {
                    process.exit(2);
                });
                this.server.listen(3000, () => {
                    console.log(`Server is running on ${this.port}`);
                });
                knex_1.default.init();
                // const xml = "<doc>Hello!</doc>"
                // const result = XmlReader.parseSync(xml)
                // console.log(result)
                const reader = XmlReader.create({ stream: true });
                const xml = `<root>
          <item v=1/>
          <item v=2/>
          <item v=3/>
          </root>`;
                reader.on('tag:item', (data) => console.log(data));
                reader.on('done', (data) => console.log("children length: ", data.children.length));
                const readr = xml.split('').forEach(char => reader.parse(char));
                console.log(readr);
            }
            catch (error) {
                console.log(error);
            }
            finally {
                this.app.use(errorHandler_1.default);
            }
        });
    }
}
exports.YApp = YApp;
const app = new YApp();
exports.default = app;
//# sourceMappingURL=app.js.map