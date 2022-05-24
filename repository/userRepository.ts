import { rejects } from "assert";
import knex from "knex";
import { resolve } from "path";
import User from "../controller/IUser";
import knexDB from "../db/knex";
import UserDetail from "../interface/RequestUserDetail";

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
                    resolve(user)
                }).catch((err: Error) => {
                    rejects(err)
                })
        })
    }

    createUser(user: User): Promise<User> {
        return new Promise(async (resolve,rejects) => {
            // this.getUserByEmail(user.email)
            // reject("duplicate_user")
            await knexDB.db("user")
                .insert(user)
                .returning("*")
                .then((res: any) => {
                    const user = res
                    resolve(user)
                }).catch((err: Error) => {
                    rejects(err)
                })
        })
    }

    updateUser(userUpdateData: User, userId: string): Promise<User> {
        return new Promise(async (resolve, rejects) => {
            await knexDB.db("user")
                .update(userUpdateData)
                .returning("*")
                .where("id", userId)
                .then((res: any) => {
                    const user = res
                    resolve(user)
                }).catch((err: Error) => {
                    rejects(err)
                })
        })
    }

    deleteUser(user: User, userId: string): Promise<User> {
        return new Promise(async (resolve, rejects) => {
            await knexDB.db("user")
                .where("id", userId)
                .del()
                .then((res: any) => {
                    resolve(res)
                }).catch((err: Error) => {
                    rejects(err)
                })
        })
    }
      
}
      
const userRepository = new UserRepository()
export default userRepository