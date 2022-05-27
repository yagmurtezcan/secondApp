import Basket from "../interface/IBasket"
import Product from "../interface/IProduct"
import User from "../interface/IUser"
import basketRepository from "../repository/basketRepository"
import userRepository from "../repository/userRepository"

class BasketService {
    addToBasket(basketBody: Basket, userId: string): Promise<Basket> {  
        return new Promise((resolve, rejects) => {
            userRepository.getUser(userId).then((user: User[]) => {

                basketRepository.checkProductStock(basketBody.quantity, basketBody.product_id).then((product: Product[]) => {
                        
                this.getBasketList(user[0].id).then((basketList: Basket[]) => {

                    let basketCount = basketList.length
                    let foundProduct = undefined

                    if(basketCount > 0) {
                        foundProduct = basketList.find(p => p.product_id === basketBody.product_id)
                    }
                           
                    if(foundProduct == undefined) {
                        basketBody.product_name = product[0].product_name
                        basketBody.user_id = user[0].id
                        basketRepository.addToBasket(basketBody).then((basketFromRepository: Basket) => {
                            resolve(basketFromRepository)
                        }).catch((err: Error) => {
                            rejects(err)
                        })
                    }else {
                        const newQuantity = foundProduct.quantity + basketBody.quantity 
                        basketRepository.updateQuantityById(foundProduct.id, newQuantity).then((repQuantity: Basket) => {
                            resolve(repQuantity)
                        }).catch((err: Error) => {
                            rejects(err)
                        })
                    }
                }).catch((err: Error) => {
                    rejects(err)
                })
            }).catch((err: Error) => {
                    rejects(err)
            })
        }).catch((err: Error) => {
            rejects(err)
        })
    })
    }

    deleteFromBasket(): Promise<Basket> {
        return new Promise((resolve, rejects) => {

        })
    }

    getBasketList(userId: string): Promise<Basket[]> {
        return new Promise((resolve, rejects) => {
            basketRepository.getBasketList(userId).then((userIdFromRepository: Basket[]) => {
                resolve(userIdFromRepository)
            }).catch((err: Error) => {
                rejects(err)
            })
        })
    }
}

const basketService = new BasketService()
export default basketService