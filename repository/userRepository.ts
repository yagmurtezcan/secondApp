import User from "../controller/IUser";
import knexDB from "../db/knex";

class UserRepository {
    getAllUsers(): Promise<User[]> {
        return new Promise(async (resolve, reject) => {
            await knexDB.db("user")
                .select("*")
                .then((res: any) => {
                    const user = res;
                    resolve(user);
                }).catch((err: Error) => {
                    reject(err);
                });
        });
    }

    getUser(userId: string): Promise<User> {
        return new Promise(async (resolve, rejects) => {
            await knexDB.db("user")
                .select("*")
                .where("id", userId)
                .then((res: any) => {
                    const user = res;
                    if(user.length > 0){
                        resolve(user)
                    }else{
                        rejects("user not found")
                    }
                }).catch((err: Error) => {
                    rejects(err)
                })
        })
    }

    getUserByEmail(email: string): Promise<User> {
        return new Promise(async (resolve, rejects) => {
            await knexDB.db("user")
                .select("*")
                .where("email", email)
                .then((res: any) => {
                    if(res.length == 0){
                        resolve(res)
                    }else{
                        rejects("email exits")
                    }
                }).catch((err: Error) => {
                    rejects(err)
                })
        })
    }

    createUser(user: User): Promise<User> {
        return new Promise((resolve,rejects) => {
            userRepository.getUserByEmail(user.email).then((userFromDB: User) => {
                 knexDB.db("user")
                .insert(user)
                .returning("*")
                .then((res: any) => {
                    const user = res
                    resolve(user)
                }).catch((err: Error) => {
                    rejects(err)
                })
            }).catch((err: Error) => {
                rejects(err)
            })
        })
    }

    updateUser(userUpdateData: User, userId: string): Promise<User> {
        return new Promise((resolve, rejects) => {
            userRepository.getUser(userId).then((user: User) => {
                    knexDB.db("user")
                    .update(userUpdateData)
                    .returning("*")
                    .where("id", userId)
                    .then((res: any) => {
                        const user = res
                        resolve(user)
                    }).catch((err: Error) => {
                        rejects(err)
                    })
            }).catch((err: Error) => {
                rejects(err)
            })
        })
    }

    deleteUser(userId: string): Promise<User> {
        return new Promise((resolve, rejects) => {
            userRepository.getUser(userId).then((user: User) => {
                 knexDB.db("user")
                .where("id", userId)
                .del()
                .then((res: any) => {
                    resolve(res)
                }).catch((err: Error) => {
                    rejects(err)
                })
            }).catch((err: Error) => {
                rejects(err)
            })
            
        })
    }
      
}
      
const userRepository = new UserRepository()
export default userRepository