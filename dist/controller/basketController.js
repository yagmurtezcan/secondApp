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
const BasketService_1 = __importDefault(require("../service/BasketService"));
const schemas = __importStar(require("../validator/basketValidator"));
class BasketController {
    constructor() {
        this.router = express_1.default.Router();
        this.routes();
    }
    addToBasket(req, res, next) {
        const basket = req.body;
        const userId = { id: req.params.id };
        schemas.default.detail.validateAsync(userId).then((validatedId) => {
            schemas.default.add.validateAsync(basket).then((validatedBasketBody) => {
                BasketService_1.default.addToBasket(validatedBasketBody, validatedId.id).then((basketFromService) => {
                    res.status(200).json({
                        status_code: 1,
                        message: "Operation Completed",
                        data: basketFromService
                    });
                }).catch((err) => {
                    next(err);
                });
            }).catch((err) => {
                next(err);
            });
        }).catch((err) => {
            next(err);
        });
    }
    deleteFromBasket(req, res, next) {
        const userId = { id: req.params.id };
        // schemas.default.detail.validateAsync(userId).then((validatedUserId: BasketDetail) => {
        //     basketService.getUserFromBasketUrl(validatedUserId.id).then((user) => {
        //     }).catch((err: Error) => {
        //         next(err)
        //     })
        // }).catch((err: Error) => {
        //     next(err)
        // })
    }
    // getBasketList(req: express.Request, res: express.Response, next: express.NextFunction) {
    //     const userId = req.params.id
    //     basketService.getBasketList(userId).then((allBasket: Basket[]) => {
    //         res.status(200).json({
    //             status_code: 1,
    //             message: "Operation Completed",
    //             data: allBasket
    //         })
    //     }).catch((err: Error) => {
    //         next(err)
    //     })
    // }
    // getUserFromBasketUrl(req: express.Request, res: express.Response, next: express.NextFunction) {
    //     const userId: BasketDetail = {id: req.params.id}
    //     schemas.default.detail.validateAsync(userId).then((validatedUserId: BasketDetail) => {
    //         basketService.getUserFromBasketUrl(validatedUserId.id).then((user) => {
    //         }).catch((err: Error) => {
    //             next(err)
    //         })
    //     }).catch((err: Error) => {
    //         next(err)
    //     })
    // }
    routes() {
        this.router.post("/user/:id/basket", this.addToBasket.bind(this));
        this.router.delete("/user/:id/basket", this.deleteFromBasket.bind(this));
        // this.router.get("/basket", this.getBasketList.bind(this))
    }
}
const basketController = new BasketController();
exports.default = basketController.router;
//# sourceMappingURL=basketController.js.map