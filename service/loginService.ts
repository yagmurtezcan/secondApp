import User from "../interface/IUser"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import userRepository from "../repository/userRepository"
import config from "../config"

class LoginService {
    login(user: User): Promise<string> {
        return new Promise((resolve, rejects) => {
            userRepository.getLoginUser(user.email).then((userFromDB: User) => {

                const hashedPassword = userFromDB.password
                bcrypt.compare(user.password, hashedPassword, (err, isMatch) => {
                    if(err) {
                        rejects(err)
                    } else if (!isMatch) {
                        rejects("Email or password is not correct")
                    } else {
                        const token = jwt.sign({
                            
                        },
                        config.secret_key,
                        {
                            expiresIn: "2h"
                        }
                        )
                        resolve(token)
                    }
                })
            }).catch((err: Error) =>{
                rejects(err)
            })
        })
    }

}

const loginService = new LoginService()
export default loginService