import { v4 as uuid } from "uuid";
import User from "../controller/IUser";
import UserDetail from "../interface/RequestUserDetail";

class UserService {
  users: User[] = [];

  constructor() {
    this.users = [];
  }

  getAllUser(): Promise<User[]> {
    if (this.users.length > 0) {
      console.log(this.users[0].firstName);
    }

    return new Promise((resolve, rejects) => {
      if(this.users.length >= 0){
        resolve(this.users);
      }else{
        rejects("database_error")
      }
    })
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
      const foundUser = this.users.find((user) => user.id === userId);
      if (foundUser) {
        resolve(foundUser);
      } else {
        rejects("user not found");
      }
    });
  }



  updateUser(user: User, userId: string): Promise<User> {
    return new Promise(async (resolve, rejects) => {
     const foundUser = userService.getUser(userId)

     if(await foundUser){
      const {firstName, lastName, email, age} = user
      user.firstName = firstName
      user.lastName = lastName
      user.email = email
      user.age = age
      resolve(user)
     }else{
       rejects("user not found")
     }
    });
  }

  deleteUser() {}
}

const userService = new UserService();
export default userService;
