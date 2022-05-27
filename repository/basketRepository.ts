import knexDB from "../db/knex"
import Basket from "../interface/IBasket"
import Product from "../interface/IProduct"


class BasketRepository {
    addToBasket(basket: Basket): Promise<Basket[]> {
        return new Promise((resolve, rejects) => {
                knexDB.db("basket")
                    .insert(basket)
                    .returning("*")
                    .then((res: Basket[]) => {
                        resolve(res)
                    }).catch((err: Error) => {
                        rejects(err)
                    })
        })
    }

    deleteFromBasket(): Promise<Basket[]> {
        return new Promise((resolve, rejects) => {

        })
    }
    
    getProductById(productId: number): Promise<Product[]> {
        return new Promise((resolve, rejects) => {
            knexDB.db("product")
                .select("*")
                .where("id", productId)
                .then((res: Product[]) => {
                    const product = res
                    if(product.length > 0) {
                        resolve(product)
                    }else{
                        rejects("product not found")
                    }
                }).catch((err: Error) => {
                    rejects(err)
                })
        })
    }

    checkProductStock(productStock: number, productId: number): Promise<Product[]> {
        return new Promise((resolve, rejects) => {
            knexDB.db("product")
                .select("*")
                .where("id", productId)
                .then((res: Product[]) => {
                    const product = res

                    if(product.length > 0){
                        const stock = product[0].product_quantity
                        if(stock > productStock && stock > 0) {
                            resolve(product)
                        }else{
                            rejects("stock out")
                        }
                    }else{
                        rejects("product not found")
                    }
                }).catch((err: Error) => {
                    rejects(err)
                })
        })
    }

    getBasketList(userId: string): Promise<Basket[]> {
        return new Promise((resolve, rejects) => {
            knexDB.db("basket")
                .select("*")
                .where("user_id", userId)
                .then((res: Basket[]) => {
                    resolve(res)
                }).catch((err: Error) => {
                    rejects(err)
                })
        })
    }

    updateQuantityById(basket_id: number, newQuantity: number): Promise<Basket[]> {
        return new Promise((resolve, rejects) => {
            knexDB.db("basket")
                .where("id", basket_id)
                .update({quantity: newQuantity})
                .then((res: any) => {
                    resolve(res)
                }).catch((err: Error) => {
                    rejects(err)
                })
        })
    }
}

const basketRepository = new BasketRepository()
export default basketRepository