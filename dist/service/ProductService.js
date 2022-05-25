"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productRepository_1 = __importDefault(require("../repository/productRepository"));
class ProductService {
    getAllProduct() {
        return new Promise((resolve, rejects) => {
        });
    }
    createProduct(product) {
        return new Promise((resolve, rejects) => {
            productRepository_1.default.createProduct(product).then((productFromRepository) => {
                resolve(productFromRepository);
            }).catch((err) => {
                rejects(err);
            });
        });
    }
    deleteProduct() {
        return new Promise((resolve, rejects) => {
        });
    }
}
const productService = new ProductService();
exports.default = productService;
//# sourceMappingURL=ProductService.js.map