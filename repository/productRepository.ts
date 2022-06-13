import knexDB from "../db/knex";
import Product from "../interface/IProduct";
import { ProductNotFoundException } from "../src/common/http.exception";

class ProductRepository {
    getAllProduct(): Promise<Product[]> {
        return new Promise((resolve, rejects) => {
            knexDB.db("product")
                .select("*")
                .then((res: Product[]) => {
                    const product = res
                    resolve(product)
                }).catch((err: Error) => {
                    rejects(err)
                })
        })
    }

    createProduct(product: Product): Promise<Product> {
        return new Promise((resolve, rejects) => {
            knexDB.db("product")
                .insert(product)
                .returning("*")
                .then((res: Product[]) => {
                    const product = res
                    resolve(product[0])
                }).catch((err: Error) => {
                    rejects(err)
                })
        })
    }

    getProductById(productId: number): Promise<Product> {
        return new Promise((resolve, rejects) => {
            knexDB.db("product")
                .select("*")
                .first()
                .where("id", productId)
                .then((res: Product) => {
                    const product = res
                    if(product){
                        resolve(product)
                    }else{
                        rejects(new ProductNotFoundException("Product Not Found"))
                    }
                }).catch((err: Error) => {
                    rejects(err)
                })

        })
    }

    deleteProduct(productId: number): Promise<number> {
        return new Promise((resolve, rejects) => {
                knexDB.db("product")
                    .where("id", productId)
                    .del()
                    .then((res: number) => {
                        resolve(res)
                    }).catch((err: Error) => {
                        rejects(err)
                    })
        })
    }

}

const productRepository = new ProductRepository()
export default productRepository