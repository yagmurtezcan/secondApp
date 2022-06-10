export class Response {
    status_code?: number
    message: string
    data?: any

    constructor(message: string, data?: any, statusCode?: number) {
        this.status_code = statusCode
        this.message = message
        this.data = data
    }
}

export default class OperationCompleted extends Response {
    constructor(public message: string = "Operation Completed", data?: any, statusCode?: number) {
        super(message, data)
        this.status_code = statusCode ? statusCode : 1
    }
}