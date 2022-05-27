import Product from "../interface/IProduct";
import productRepository from "../repository/productRepository";

class ProductService {
    getAllProduct(): Promise<Product> {
        return new Promise((resolve, rejects) => {
            productRepository.getAllProduct().then((productFromRepository: Product) => {
                resolve(productFromRepository)
            }).catch((err: Error) => {
                rejects(err)
            })
        })
    }

    getProductById(productId: string): Promise<Product> {
        return new Promise((resolve, rejects) => {
            productRepository.getProductById(productId).then((existProduct: Product) => {
                resolve(existProduct)
            }).catch((err: Error) => {
                rejects(err)
            })
        })
    }

    createProduct(product: Product): Promise<Product> {
        return new Promise((resolve, rejects) => {
            productRepository.createProduct(product).then((productFromRepository: Product) => {
                resolve(productFromRepository)
            }).catch((err: Error) => {
                rejects(err)
            })

        })
    }

    deleteProduct(productId: string): Promise<Product> {
        return new Promise((resolve, rejects) => {
            productRepository.getProductById(productId).then((resFromDB) => {
                productRepository.deleteProduct(productId).then((deletedProduct: Product) => {
                    resolve(deletedProduct)
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