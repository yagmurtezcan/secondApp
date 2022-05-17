import express from "express"
import { v4 as uuid } from "uuid";

class UserOperations {
    users : any[] = []

    constructor() {
        this.users = []
    }

    getId (req : express.Request , res : express.Response , next : express.NextFunction) {
        const userId = req.params.id
        return userId
    }

    findUser (req : express.Request, res : express.Response , next :express.NextFunction){
        const userId = req.params.id
        const foundUser = this.users.find((user) => user.id === userId)
        return foundUser
    }

    filterUser (req : express.Request, res : express.Response , next : express.NextFunction){
        const userId = req.params.id
        this.users = this.users.filter((user) => user.id !== userId)
        return this.users
    }

    pushUser (req : express.Request , res : express.Response, next : express.NextFunction){
        const user = req.body
        const userId = uuid()
        const userWithId = {...user , userId : userId}
        this.users.push(userWithId)
        return this.users
    }

    setNewData (req : express.Request , res : express.Response , next : express.NextFunction){

    }
}

const userOperations = new UserOperations()
export default userOperations



