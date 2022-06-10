import express from "express"
import IRouterBase from "../interface/IRouter";
import checkAuth from "../middleware/checkAuth";
import upload from "../middleware/uploadProfilePhoto";
import fileUploadService from "../service/fileUploadService";

class FileUploadController implements IRouterBase {
    router: express.Router;

    constructor() {
        this.router = express.Router();
        this.routes();
    }

    loadProfilePhoto(req: express.Request, res: express.Response, next: express.NextFunction) {
        const profilePhoto = req.file
    
        fileUploadService.loadProfilePhoto(profilePhoto).then((existProfilePhoto) => {
            res.status(200).json({
                status_code: 1,
                message: "Operation Completed",
                data: {image_key: existProfilePhoto?.filename}
            })
        }).catch((err: Error) => {
            next(err)
        })
    }

    routes() {
        this.router.post("/", checkAuth, upload.single("image"), this.loadProfilePhoto.bind(this))
    }
}

const fileUploadController = new FileUploadController()
export default fileUploadController.router