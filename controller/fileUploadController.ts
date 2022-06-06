import express from "express"
import IRouterBase from "../interface/IRouter";
import checkAuth from "../middleware/checkAuth";
import upload from "../middleware/uploadProfilePhoto";
import fileUploadService from "../service/fileUploadService";
import { TokenRequest } from "../tokenRequest";


class FileUploadController implements IRouterBase {
    router: express.Router;

    constructor() {
        this.router = express.Router();
        this.routes();
    }

    loadProfilePhoto(req: TokenRequest, res: express.Response, next: express.NextFunction) {
        const profilePhoto = req.file
        const userId = req.user.id
        const user = req.user
        
        fileUploadService.loadProfilePhoto(profilePhoto, user, userId).then((photoFile) => {
            res.status(200).json({
                status_code: 1,
                message: "Operation Completed",
                data : photoFile
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