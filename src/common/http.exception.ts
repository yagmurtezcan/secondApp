export class HttpException extends Error {
    status: number
    status_code?: number
    message: string
    data?: any

    constructor(status: number, message: string, statusCode?: number, data?: any) {
        super()
        this.status = status
        this.status_code = statusCode
        this.message = message
    }
}

export class TokenNotFoundException extends HttpException {
    constructor(public message: string = "Token not found", statusCode?: number) {
        super(409, message, statusCode)
        this.status_code = statusCode ? statusCode : 2
    }
}

export class UserAlreadyExistException extends HttpException {
    constructor(message: string, statusCode?: number) {
        if(!statusCode) statusCode = 2
        super(500, message || "User already exist", statusCode)
    }
}

export class UserNotFoundException extends HttpException {
    constructor(message: string, statusCode?: number) {
        if(!statusCode) statusCode = 2
        super(400, message || "User not found", statusCode)
    }
}

export class ProductNotFoundException extends HttpException {
    constructor(message: string, statusCode?: number) {
        if(!statusCode) statusCode = 2
        super(400, message || "Product not found", statusCode)
    }
}

export class SelectPhotoException extends HttpException {
    constructor(message: string, statusCode?: number) {
        if(!statusCode) statusCode: 2
        super(400, message || "Please select a photo", statusCode)
    }
}