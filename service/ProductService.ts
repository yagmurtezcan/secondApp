import Product from "../interface/IProduct";
import productRepository from "../repository/productRepository";
import OperationCompleted from "../src/common/http.response";

class ProductService {
    getAllProduct(): Promise<OperationCompleted> {
        return new Promise((resolve, rejects) => {
            productRepository.getAllProduct().then((productFromRepository: Product[]) => {
                resolve(new OperationCompleted(undefined, productFromRepository))
            }).catch((err: Error) => {
                rejects(err)
            })
        })
    }

    getProductById(productId: number): Promise<OperationCompleted> {
        return new Promise((resolve, rejects) => {
            productRepository.getProductById(productId).then((existProduct: Product) => {
                resolve(new OperationCompleted(undefined, existProduct))
            }).catch((err: Error) => {
                rejects(err)
            })
        })
    }

    createProduct(product: Product): Promise<OperationCompleted> {
        return new Promise((resolve, rejects) => {
            productRepository.createProduct(product).then((productFromRepository: Product) => {
                resolve(new OperationCompleted(undefined, productFromRepository))
            }).catch((err: Error) => {
                rejects(err)
            })

        })
    }

    deleteProduct(productId: number): Promise<OperationCompleted> {
        return new Promise((resolve, rejects) => {
            productRepository.getProductById(productId).then((resFromDB) => {
                productRepository.deleteProduct(productId).then((deletedProduct: number) => {
                    resolve(new OperationCompleted(undefined))
                }).catch((err: Error) => {
                    rejects(err)
                })
            }).catch((err: Error) => {
                rejects(err)
            })
          
        })
    }
}

const productService = new ProductService()
export default productService