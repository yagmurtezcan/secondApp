import { rejects } from "assert";
import { v4 as uuid } from "uuid";
import User from "../controller/IUser";

class UserService {
  users: User[] = [];

  constructor() {
    this.users = [];
  }

  getAllUser(user: User): Promise<User> {
    return new Promise((resolve, rejects) => {
      if (user) {
        resolve(user);
      } else {
        rejects("no data");
      }
    });
  }

  createUser(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      if (user) {
        const userId = uuid();
        const userWithId = { ...user, id: userId };
        this.users.push(userWithId);

        resolve(userWithId);
      } else {
        reject("database_error");
      }
    });
  }

  getUser(userId: string): Promise<User> {
    return new Promise((resolve, rejects) => {
      const foundUserId = this.users.find((user) => user.id === userId);
      if (foundUserId) {
        resolve(foundUserId);
      } else {
        rejects("database_error");
      }
    });
  }

  updateUser(user: User): Promise<User> {
    return new Promise((resolve, rejects) => {
      if (user) {
        const { firstName, lastName, email, age } = user;
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.age = age;
        resolve(user);
      } else {
        rejects("database_error");
      }
    });
  }

  deleteUser() {}
}

const userService = new UserService();
export default userService;
