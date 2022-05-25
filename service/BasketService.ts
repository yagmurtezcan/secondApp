import Basket from "../interface/IBasket"
import basketRepository from "../repository/basketRepository"

class BasketService {
    addToBasket(basketBody: Basket, userId: string): Promise<Basket> {
        return new Promise((resolve, rejects) => {
            basketRepository.addToBasket(basketBody, userId).then((basketFromRepository: Basket) => {
                resolve(basketFromRepository)
            }).catch((err: Error) => {
                rejects(err)
            })
        })
    }

    deleteFromBasket(): Promise<Basket> {
        return new Promise((resolve, rejects) => {

        })
    }

    getUserFromBasketUrl(userId: string): Promise<Basket> {
        return new Promise((resolve, rejects) => {
            basketRepository.getUserFromBasketUrl(userId).then((user) => {
                resolve(user)
            }).catch((err: Error) => {
                rejects(err)
            })
        })
    }
}

const basketService = new BasketService()
export default basketService