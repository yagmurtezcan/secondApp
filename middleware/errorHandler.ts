import { NextFunction, Request, Response } from "express";
import { HttpException } from "../src/common/http.exception";

function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
    const errorObject: {
        status?: number,
        result?: string,
        message?: string,
        status_code?: number
    } = {};


const status = error.status || 500

const status_code = error.status_code || 0

errorObject.message = error.message || "Something went wrong"
errorObject.status_code = status_code

response.status(status).send({
    ...errorObject
})

}

export default errorMiddleware
