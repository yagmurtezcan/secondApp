import User from "../interface/IUser";
import knexDB from "../db/knex";

class UserRepository {
    getAllUsers(): Promise<User[]> {
        return new Promise(async (resolve, reject) => {
            await knexDB.db("user")
                .select("*")
                .then((res: User[]) => {
                    const user = res;
                    resolve(user);
                }).catch((err: Error) => {
                    reject(err);
                });
        });
    }

    getUser(userId: number): Promise<User[]> {
        return new Promise(async (resolve, rejects) => {
            await knexDB.db("user")
                .select("*")
                .where("id", userId)
                .then((res: User[]) => {
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

    getUserByEmail(email: string): Promise<User[]> {
        return new Promise(async (resolve, rejects) => {
            await knexDB.db("user")
                .select("*")
                .where("email", email)
                .then((res: User[]) => {
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

    getLoginUser(email: string): Promise<User> {
        return new Promise((resolve, rejects) => {
            knexDB.db("user")
                .select("*")
                .first()
                .where("email", email)
                .where("isActive", true)
                .then((res: User) => {
                    resolve(res)
                }).catch((err: Error) => {
                    rejects(err)
                })
        })
    }

    createUser(user: User): Promise<User[]> {
        return new Promise((resolve,rejects) => {
                 knexDB.db("user")
                .insert(user)
                .returning("*")
                .then((res: User[]) => {
                    const user = res
                    resolve(user)
                }).catch((err: Error) => {
                    rejects(err)
                })
        })
    }

    updateUser(userUpdateData: User, userId: number): Promise<User[]> {
        return new Promise((resolve, rejects) => {
            knexDB.db("user")
            .update(userUpdateData)
            .returning("*")
            .where("id", userId)
            .then((res: User[]) => {
                const user = res
                resolve(user)
            }).catch((err: Error) => {
                rejects(err)
            })
        })
    }

    deleteUser(userId: number): Promise<number> {
        return new Promise((resolve, rejects) => {
                 knexDB.db("user")
                .where("id", userId)
                .del()
                .then((res: number) => {
                    resolve(res)
                }).catch((err: Error) => {
                    rejects(err)
                })
        })
    }

    checkUserActivity(userEmail: User): Promise<User> {
        return new Promise((resolve, rejects) => {
            knexDB.db("user")
                .select("*")
                .first()
                .where("email", userEmail)
                .where("isActive", true)
                .then((res: User) => {
                    resolve(res)
                }).catch((err: Error) => {
                    rejects(err)
                })
                
        })
    }
      
}
      
const userRepository = new UserRepository()
export default userRepository