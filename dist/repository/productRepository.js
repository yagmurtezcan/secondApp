"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("../db/knex"));
const http_exception_1 = require("../src/common/http.exception");
class ProductRepository {
    getAllProduct() {
        return new Promise((resolve, rejects) => {
            knex_1.default.db("product")
                .select("*")
                .then((res) => {
                const product = res;
                resolve(product);
            }).catch((err) => {
                rejects(err);
            });
        });
    }
    createProduct(product) {
        return new Promise((resolve, rejects) => {
            knex_1.default.db("product")
                .insert(product)
                .returning("*")
                .then((res) => {
                const product = res;
                resolve(product[0]);
            }).catch((err) => {
                rejects(err);
            });
        });
    }
    getProductById(productId) {
        return new Promise((resolve, rejects) => {
            knex_1.default.db("product")
                .select("*")
                .first()
                .where("id", productId)
                .then((res) => {
                const product = res;
                if (product) {
                    resolve(product);
                }
                else {
                    rejects(new http_exception_1.ProductNotFoundException("Product Not Found"));
                }
            }).catch((err) => {
                rejects(err);
            });
        });
    }
    deleteProduct(productId) {
        return new Promise((resolve, rejects) => {
            knex_1.default.db("product")
                .where("id", productId)
                .del()
                .then((res) => {
                resolve(res);
            }).catch((err) => {
                rejects(err);
            });
        });
    }
}
const productRepository = new ProductRepository();
exports.default = productRepository;
//# sourceMappingURL=productRepository.js.map