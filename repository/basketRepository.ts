import knexDB from "../db/knex"
import Basket from "../interface/IBasket"

class BasketRepository {
    addToBasket(basket: Basket, userId: string): Promise<Basket> {
        return new Promise((resolve, rejects) => {
            basketRepository.getUserFromBasketUrl(userId).then((user) => {
                knexDB.db("basket")
                    .insert(basket)
                    .returning("*")
                    .then((res: any) => {
                        const basket = res
                        resolve(basket)
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

    getUserFromBasketUrl(userId: string): Promise<Basket> {
        return new Promise((resolve, rejects) => {
            knexDB.db("user")
                .select("*")
                .where("id", userId)
                .then((res: any) => {
                    const user = res
                    if(user.length > 0){
                        resolve(user)
                    }else{
                        rejects("user not found")
                    }
                }).catch((err: Error) => {
                    rejects(err)
                })
        })
    }
}

const basketRepository = new BasketRepository()
export default basketRepository