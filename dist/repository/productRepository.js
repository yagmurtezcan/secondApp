"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("../db/knex"));
class ProductRepository {
    getAllProduct() {
        return new Promise((resolve, rejects) => {
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
    deleteProduct() {
        return new Promise((resole, rejects) => {
        });
    }
}
const productRepository = new ProductRepository();
exports.default = productRepository;
//# sourceMappingURL=productRepository.js.map