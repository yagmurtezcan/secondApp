"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const basketRepository_1 = __importDefault(require("../repository/basketRepository"));
const productRepository_1 = __importDefault(require("../repository/productRepository"));
const userRepository_1 = __importDefault(require("../repository/userRepository"));
class BasketService {
    addToBasket(basketBody, userId) {
        return new Promise((resolve, rejects) => {
            userRepository_1.default.getUser(userId).then((user) => {
                basketRepository_1.default.checkProductStock(basketBody.quantity, basketBody.product_id).then((product) => {
                    this.getBasketList(user[0].id).then((basketList) => {
                        productRepository_1.default.getProductById(basketBody.product_id).then((productfrom) => {
                        });
                        let basketCount = basketList.length;
                        let foundProduct = undefined;
                        if (basketCount > 0) {
                            foundProduct = basketList.find(p => p.product_id === basketBody.product_id);
                        }
                        if (foundProduct == undefined) {
                            basketBody.product_name = product[0].product_name;
                            basketBody.user_id = user[0].id;
                            basketRepository_1.default.addToBasket(basketBody).then((basketFromRepository) => {
                                resolve(basketFromRepository);
                            }).catch((err) => {
                                rejects(err);
                            });
                        }
                        else {
                            const newQuantity = foundProduct.quantity + basketBody.quantity;
                            const totalPrice = (foundProduct.unit_price) * foundProduct.quantity;
                            basketRepository_1.default.updateQuantityById(foundProduct.id, newQuantity).then((repQuantity) => {
                                resolve(repQuantity);
                            }).catch((err) => {
                                rejects(err);
                            });
                        }
                    }).catch((err) => {
                        rejects(err);
                    });
                }).catch((err) => {
                    rejects(err);
                });
            }).catch((err) => {
                rejects(err);
            });
        });
    }
    deleteFromBasket() {
        return new Promise((resolve, rejects) => {
        });
    }
    getBasketList(userId) {
        return new Promise((resolve, rejects) => {
            basketRepository_1.default.getBasketList(userId).then((userIdProductMatches) => {
                resolve(userIdProductMatches);
            }).catch((err) => {
                rejects(err);
            });
        });
    }
}
const basketService = new BasketService();
exports.default = basketService;
//# sourceMappingURL=BasketService.js.map