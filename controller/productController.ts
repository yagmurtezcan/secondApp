import express from "express"
import Product from "../interface/IProduct";
import IRouterBase from "../interface/IRouter"
import ProductDetail from "../interface/RequestProductDetail";
import productService from "../service/ProductService";
import * as schemas from "../validator/productValidator";

class ProductController implements IRouterBase {
    router: express.Router;

    constructor() {
        this.router = express.Router()
        this.routes()
    }


    getAllProduct(req: express.Request, res: express.Response, next: express.NextFunction) {
        productService.getAllProduct().then((productFromService: Product[]) => {
            res.status(200).json({
                status_code: 1,
                message: "Operation Completed",
                data: productFromService
            })
        }).catch((err: Error) => {
            next(err)
        })
    }

    getProductById(req: express.Request, res: express.Response, next: express.NextFunction) {
        const productInfo: ProductDetail = {id: req.params.id}
        
        schemas.default.detail.validateAsync(productInfo).then((validatedId: ProductDetail) => {
            productService.getProductById(validatedId.id).then((product: Product[]) => {
                res.status(200).json({
                    status_code: 1,
                    message: "Operation Completed",
                    data: product
                })
            }).catch((err: Error) => {
                next(err)
            })
        }).catch((err: Error) => {
            next(err)
        })
    }

    createProduct(req: express.Request, res: express.Response, next: express.NextFunction){
        const product: Product = req.body

        schemas.default.create.validateAsync(product).then((validatedProduct: Product) => {
            productService.createProduct(validatedProduct).then((productFromService: Product[]) => {
                res.status(200).json({
                    status_code: 1,
                    message: "Operation Completed",
                    data: productFromService
                })
            }).catch((err: Error) => {
                next(err)
            })
        }).catch((err: Error) => {
            next(err)
        })

    }

    deleteProduct(req: express.Request, res: express.Response, next: express.NextFunction){
        const productInfo: ProductDetail = {id: req.params.id}
 
        schemas.default.detail.validateAsync(productInfo).then((validatedId: ProductDetail) => {
            productService.deleteProduct(validatedId.id).then((productFromService: number) => {
                res.status(200).json({
                    status_code: 1,
                    message: "Operation Completed"
                })
            }).catch((err: Error) => {
                next(err)
            })
        }).catch((err: Error) => {
            next(err)
        })
    }

    routes() {
        this.router.get("/", this.getAllProduct.bind(this))
        this.router.get("/:id", this.getProductById.bind(this))
        this.router.post("/", this.createProduct.bind(this))
        this.router.delete("/:id", this.deleteProduct.bind(this))
    }
}

const productController = new ProductController()
export default productController.router