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
const express_1 = __importDefault(require("express"));
const ProductService_1 = __importDefault(require("../service/ProductService"));
const schemas = __importStar(require("../validator/productValidator"));
class ProductController {
    constructor() {
        this.router = express_1.default.Router();
        this.routes();
    }
    getAllProduct(req, res, next) {
    }
    createProduct(req, res, next) {
        const product = req.body;
        schemas.default.create.validateAsync(product).then((validatedProduct) => {
            ProductService_1.default.createProduct(validatedProduct).then((productFromService) => {
                res.status(200).json({
                    status_code: 1,
                    message: "Operation Completed",
                    data: productFromService
                });
            }).catch((err) => {
                next(err);
            });
        }).catch((err) => {
            next(err);
        });
    }
    deleteProduct(req, res, next) {
    }
    routes() {
        this.router.get("/", this.getAllProduct.bind(this));
        this.router.post("/", this.createProduct.bind(this));
        this.router.delete("/:id", this.deleteProduct.bind(this));
    }
}
const productController = new ProductController();
exports.default = productController.router;
//# sourceMappingURL=productController.js.map