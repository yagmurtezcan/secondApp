import express from "express"
import Basket from "../interface/IBasket"
import IRouterBase from "../interface/IRouter"
import BasketDetail from "../interface/RequestBasketDetail"
import UserDetail from "../interface/RequestUserDetail"
import basketService from "../service/BasketService"
import * as schemas from "../validator/basketValidator"

class BasketController implements IRouterBase{
    router: express.Router

    constructor() {[]
        this.router = express.Router()
        this.routes()
    }

    addToBasket(req: express.Request, res: express.Response, next: express.NextFunction) {
        const basket = req.body

        const userId: UserDetail = {id: req.params.id}
        basket.user_id = userId // artık user setlendiği için basket içinde user quantity ve product id göndermiş olursun ayrıca sadece user ıd yi validasyona göndermene gerek yok.

      // schemas.default.detail.validateAsync(userId).then((validatedUserId: BasketDetail) => {
            schemas.default.add.validateAsync(basket).then((validatedBasketBody: Basket) => {
                basketService.addToBasket(validatedBasketBody).then((basketFromService: Basket[]) => {
                    res.status(200).json({
                        status_code: 1,
                        message: "Operation Completed",
                        // data: basketFromService
                    })
                }).catch((err: Error) => {
                    next(err)
                })
            }).catch((err: Error) => {
                next(err)
            })
      // }
    }

    deleteFromBasket(req: express.Request, res: express.Response, next: express.NextFunction) {
        const userId: UserDetail = {id: req.params.id}
    }

    routes() {
        this.router.post("/user/:id/basket", this.addToBasket.bind(this))
        this.router.delete("/user/:id/basket", this.deleteFromBasket.bind(this))
    }
}

const basketController = new BasketController()
export default basketController.router