import multer from "multer"
import express from "express"

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images")
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = req.user.id + '-' + Math.round(Math.random() * 1E9)
        const ext = file.originalname.split(".") [1]
        cb(null, uniqueSuffix + "." + ext)
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