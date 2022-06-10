import User from "../interface/IUser";
import knexDB from "../db/knex";

class UserRepository {
    getAllUsers(): Promise<User[]> {
        return new Promise(async (resolve, reject) => {
            await knexDB.db("user")
                .select(["id", "firstname", "lastname", "email", "isActive", "age", "image"])
                .then((res: User[]) => {
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
                .select(["id", "email"])
                .first()
                .where("id", userId)
                .then((res: User) => {
                    const user = res;
                    if(user){
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
                    if(res){
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

    createUser(user: User): Promise<User> {
        return new Promise((resolve,rejects) => {
                 knexDB.db("user")
                .insert(user)
                .returning(["id"])
                .then((res: User[]) => {
                    const user = res
                    resolve(user[0])
                }).catch((err: Error) => {
                    rejects(err)
                })
        })
    }

    updateUser(userUpdateData: User, userId: string): Promise<User> {
        return new Promise((resolve, rejects) => {
            knexDB.db("user")
            .update(userUpdateData)
            .returning(["id", "firstname", "lastname", "email", "age", "isActive"])
            .where("id", userId)
            .then((res: User[]) => {
                resolve(res[0])
            }).catch((err: Error) => {
                rejects(err)
            })
        })
    }

    deleteUser(userId: string): Promise<number> {
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