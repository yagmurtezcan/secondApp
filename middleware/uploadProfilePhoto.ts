import multer from "multer"
import express from "express"

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images")
    },
    filename: (req: express.Request, file, cb) => {
        cb(null,  req.user.id + "-" + "avatar")
    }
})

const fileFilter = (req: any, file: any, cb: any) => {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true)
    } else {
        cb(null, false)
        return cb(new Error("only .png .jpg and format allowed"))
    }
}

const upload = multer({
    storage: fileStorage, 
    limits: {fileSize: 1024 * 1024 * 5}, 
    fileFilter: fileFilter
})

export default upload