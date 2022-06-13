import Basket from "../interface/IBasket"
import Product from "../interface/IProduct"
import User from "../interface/IUser"
import basketRepository from "../repository/basketRepository"
import productRepository from "../repository/productRepository"
import userRepository from "../repository/userRepository"

class BasketService {
    addToBasket(basketBody: Basket): Promise<Basket[]> {  
        return new Promise((resolve, rejects) => {
            

                basketRepository.checkProductStock(basketBody.quantity, basketBody.product_id).then((product: Product[]) => {
                     
                this.getBasketList(basketBody.user_id).then((basketList: Basket[]) => {
                    productRepository.getProductById(basketBody.product_id).then((productfrom) => {
                        
                    })

                    let basketCount = basketList.length
                    let foundProduct = undefined

                    if(basketCount > 0) {
                        foundProduct = basketList.find(p => p.product_id === basketBody.product_id)
                    }
                           
                    if(foundProduct == undefined) {
                        basketBody.product_name = product[0].product_name
                       // basketBody.user_id = user.id
                        basketRepository.addToBasket(basketBody).then((basketFromRepository: Basket[]) => {
                            resolve(basketFromRepository)
                        }).catch((err: Error) => {
                            rejects(err)
                        })
                    }else {
                        const newQuantity = foundProduct.quantity + basketBody.quantity
                        const totalPrice = (foundProduct.unit_price) * foundProduct.quantity
                        basketRepository.updateQuantityById(foundProduct.id, newQuantity).then((repQuantity: Basket[]) => {
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
    })
    }

    deleteFromBasket(): Promise<Basket[]> {
        return new Promise((resolve, rejects) => {

        })
    }

    getBasketList(userId: number): Promise<Basket[]> {
        return new Promise((resolve, rejects) => {
            basketRepository.getBasketList(userId).then((userIdProductMatches: Basket[]) => {
                resolve(userIdProductMatches)
            }).catch((err: Error) => {
                rejects(err)
            })
        })
    }
}

const basketService = new BasketService()
export default basketService