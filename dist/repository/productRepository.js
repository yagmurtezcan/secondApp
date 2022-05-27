"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("../db/knex"));
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
                resolve(product);
            }).catch((err) => {
                rejects(err);
            });
        });
    }
    getProductById(productId) {
        return new Promise((resolve, rejects) => {
            knex_1.default.db("product")
                .select("*")
                .where("id", productId)
                .then((res) => {
                const product = res;
                if (product.length > 0) {
                    resolve(product);
                }
                else {
                    rejects("product not found");
                }
            }).catch((err) => {
                rejects(err);
            });
        });
    }
    deleteProduct(productId) {
        return new Promise((resolve, rejects) => {
            productRepository.getProductById(productId).then((resFromgetId) => {
                knex_1.default.db("product")
                    .where("id", productId)
                    .del()
                    .then((res) => {
                    resolve(res);
                }).catch((err) => {
                    rejects(err);
                });
            }).catch((err) => {
                rejects(err);
            });
        });
    }
}
const productRepository = new ProductRepository();
exports.default = productRepository;
//# sourceMappingURL=productRepository.js.map