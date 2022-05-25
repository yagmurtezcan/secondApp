import express from "express"
import Basket from "../interface/IBasket"
import IRouterBase from "../interface/IRouter"
import BasketDetail from "../interface/RequestBasketDetail"
import basketService from "../service/BasketService"
import * as schemas from "../validator/basketValidator"

class BasketController implements IRouterBase{
    router: express.Router

    constructor() {
        this.router = express.Router()
        this.routes()
    }

    addToBasket(req: express.Request, res: express.Response, next: express.NextFunction) {
        const basket = req.body

        const userId: BasketDetail = {id: req.params.id}

        schemas.default.detail.validateAsync(userId).then((validatedId: BasketDetail) => {
            schemas.default.add.validateAsync(basket).then((validatedBasketBody: Basket) => {
                basketService.addToBasket(validatedBasketBody, validatedId.id).then((basketFromService: Basket) => {
                    res.status(200).json({
                        status_code: 1,
                        message: "Operation Completed",
                        data: basketFromService
                    })
                }).catch((err: Error) => {
                    next(err)
                })
            }).catch((err: Error) => {
                next(err)
            })
        }).catch((err: Error) => {
            next(err)
        })

       
    }

    deleteFromBasket(req: express.Request, res: express.Response, next: express.NextFunction) {
        const userId: BasketDetail = {id: req.params.id}

        schemas.default.detail.validateAsync(userId).then((validatedUserId: BasketDetail) => {
            basketService.getUserFromBasketUrl(validatedUserId.id).then((user) => {
                
            }).catch((err: Error) => {
                next(err)
            })
        }).catch((err: Error) => {
            next(err)
        })
    }

    getUserFromBasketUrl(req: express.Request, res: express.Response, next: express.NextFunction) {
        const userId: BasketDetail = {id: req.params.id}

        schemas.default.detail.validateAsync(userId).then((validatedUserId: BasketDetail) => {
            basketService.getUserFromBasketUrl(validatedUserId.id).then((user) => {
                
            }).catch((err: Error) => {
                next(err)
            })
        }).catch((err: Error) => {
            next(err)
        })
    }

    routes() {
        this.router.post("/:id/basket", this.addToBasket.bind(this))
        this.router.delete("/:id/basket", this.deleteFromBasket.bind(this))
    }
}

const basketController = new BasketController()
export default basketController.router