import knexDB from "../db/knex";
import Product from "../interface/IProduct";

class ProductRepository {
    getAllProduct(): Promise<Product> {
        return new Promise((resolve, rejects) => {
            knexDB.db("product")
                .select("*")
                .then((res: any) => {
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
                .then((res: any) => {
                    const product = res
                    resolve(product)
                }).catch((err: Error) => {
                    rejects(err)
                })
        })
    }

    getProductById(productId: string): Promise<Product> {
        return new Promise((resolve, rejects) => {
            knexDB.db("product")
                .select("*")
                .where("id", productId)
                .then((res: any) => {
                    const product = res
                    if(product.length > 0){
                        resolve(product)
                    }else{
                        rejects("product not found")
                    }
                }).catch((err: Error) => {
                    rejects(err)
                })

        })
    }

    deleteProduct(productId: string): Promise<Product> {
        return new Promise((resolve, rejects) => {
            productRepository.getProductById(productId).then((resFromgetId: Product) => {
                knexDB.db("product")
                    .where("id", productId)
                    .del()
                    .then((res: any) => {
                        resolve(res)
                    }).catch((err: Error) => {
                        rejects(err)
                    })
            }).catch((err: Error) => {
                rejects(err)
            })
        })
    }
}

const productRepository = new ProductRepository()
export default productRepository