"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productRepository_1 = __importDefault(require("../repository/productRepository"));
const http_response_1 = __importDefault(require("../src/common/http.response"));
class ProductService {
    getAllProduct() {
        return new Promise((resolve, rejects) => {
            productRepository_1.default.getAllProduct().then((productFromRepository) => {
                resolve(new http_response_1.default(undefined, productFromRepository));
            }).catch((err) => {
                rejects(err);
            });
        });
    }
    getProductById(productId) {
        return new Promise((resolve, rejects) => {
            productRepository_1.default.getProductById(productId).then((existProduct) => {
                resolve(new http_response_1.default(undefined, existProduct));
            }).catch((err) => {
                rejects(err);
            });
        });
    }
    createProduct(product) {
        return new Promise((resolve, rejects) => {
            productRepository_1.default.createProduct(product).then((productFromRepository) => {
                resolve(new http_response_1.default(undefined, productFromRepository));
            }).catch((err) => {
                rejects(err);
            });
        });
    }
    deleteProduct(productId) {
        return new Promise((resolve, rejects) => {
            productRepository_1.default.getProductById(productId).then((resFromDB) => {
                productRepository_1.default.deleteProduct(productId).then((deletedProduct) => {
                    resolve(new http_response_1.default(undefined));
                }).catch((err) => {
                    rejects(err);
                });
            }).catch((err) => {
                rejects(err);
            });
        });
    }
}
const productService = new ProductService();
exports.default = productService;
//# sourceMappingURL=ProductService.js.map