"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("../db/knex"));
class UserRepository {
    getAllUsers() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.db("user")
                .select("*")
                .then((res) => {
                const user = res;
                resolve(user);
            }).catch((err) => {
                reject(err);
            });
        }));
    }
    getUser(userId) {
        return new Promise((resolve, rejects) => __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.db("user")
                .select("*")
                .where("id", userId)
                .then((res) => {
                const user = res;
                if (user.length > 0) {
                    resolve(user);
                }
                else {
                    rejects("user not found");
                }
            }).catch((err) => {
                rejects(err);
            });
        }));
    }
    getUserByEmail(email) {
        return new Promise((resolve, rejects) => __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.db("user")
                .select("*")
                .where("email", email)
                .then((res) => {
                if (res.length == 0) {
                    resolve(res);
                }
                else {
                    rejects("email exits");
                }
            }).catch((err) => {
                rejects(err);
            });
        }));
    }
    getLoginUser(email) {
        return new Promise((resolve, rejects) => {
            knex_1.default.db("user")
                .select("*")
                .first()
                .where("email", email)
                .where("isActive", true)
                .then((res) => {
                resolve(res);
            }).catch((err) => {
                rejects(err);
            });
        });
    }
    createUser(user) {
        return new Promise((resolve, rejects) => {
            knex_1.default.db("user")
                .insert(user)
                .returning("*")
                .then((res) => {
                const user = res;
                resolve(user);
            }).catch((err) => {
                rejects(err);
            });
        });
    }
    updateUser(userUpdateData, userId) {
        return new Promise((resolve, rejects) => {
            knex_1.default.db("user")
                .update(userUpdateData)
                .returning(["id", "firstname", "lastname", "email", "age", "isActive"])
                .where("id", userId)
                .then((res) => {
                resolve(res[0]);
            }).catch((err) => {
                rejects(err);
            });
        });
    }
    deleteUser(userId) {
        return new Promise((resolve, rejects) => {
            knex_1.default.db("user")
                .where("id", userId)
                .del()
                .then((res) => {
                resolve(res);
            }).catch((err) => {
                rejects(err);
            });
        });
    }
    checkUserActivity(userEmail) {
        return new Promise((resolve, rejects) => {
            knex_1.default.db("user")
                .select("*")
                .first()
                .where("email", userEmail)
                .where("isActive", true)
                .then((res) => {
                resolve(res);
            }).catch((err) => {
                rejects(err);
            });
        });
    }
}
const userRepository = new UserRepository();
exports.default = userRepository;
//# sourceMappingURL=userRepository.js.map