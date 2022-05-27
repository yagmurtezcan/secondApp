"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productRepository_1 = __importDefault(require("../repository/productRepository"));
class ProductService {
    getAllProduct() {
        return new Promise((resolve, rejects) => {
            productRepository_1.default.getAllProduct().then((productFromRepository) => {
                resolve(productFromRepository);
            }).catch((err) => {
                rejects(err);
            });
        });
    }
    getProductById(productId) {
        return new Promise((resolve, rejects) => {
            productRepository_1.default.getProductById(productId).then((existProduct) => {
                resolve(existProduct);
            }).catch((err) => {
                rejects(err);
            });
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
    deleteProduct(productId) {
        return new Promise((resolve, rejects) => {
            productRepository_1.default.deleteProduct(productId).then((deletedProduct) => {
                resolve(deletedProduct);
            }).catch((err) => {
                rejects(err);
            });
        });
    }
}
const productService = new ProductService();
exports.default = productService;
//# sourceMappingURL=ProductService.js.map