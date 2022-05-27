"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("../db/knex"));
class BasketRepository {
    addToBasket(basket) {
        return new Promise((resolve, rejects) => {
            knex_1.default.db("basket")
                .insert(basket)
                .returning("*")
                .then((res) => {
                resolve(res);
            }).catch((err) => {
                rejects(err);
            });
        });
    }
    deleteFromBasket() {
        return new Promise((resolve, rejects) => {
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
    checkProductStock(productStock, productId) {
        return new Promise((resolve, rejects) => {
            knex_1.default.db("product")
                .select("*")
                .where("id", productId)
                .then((res) => {
                const product = res;
                if (product.length > 0) {
                    const stock = product[0].product_quantity;
                    if (stock > productStock && stock > 0) {
                        resolve(product);
                    }
                    else {
                        rejects("stock out");
                    }
                }
                else {
                    rejects("product not found");
                }
            }).catch((err) => {
                rejects(err);
            });
        });
    }
    getBasketList(userId) {
        return new Promise((resolve, rejects) => {
            knex_1.default.db("basket")
                .select("*")
                .where("user_id", userId)
                .then((res) => {
                resolve(res);
            }).catch((err) => {
                rejects(err);
            });
        });
    }
    updateQuantityById(basket_id, newQuantity) {
        return new Promise((resolve, rejects) => {
            knex_1.default.db("basket")
                .where("id", basket_id)
                .update({ quantity: newQuantity })
                .then((res) => {
                resolve(res);
            }).catch((err) => {
                rejects(err);
            });
        });
    }
}
const basketRepository = new BasketRepository();
exports.default = basketRepository;
//# sourceMappingURL=basketRepository.js.map