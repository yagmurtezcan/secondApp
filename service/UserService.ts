import User from "../interface/IUser";
import UserDetail from "../interface/RequestUserDetail";
import userRepository from "../repository/userRepository";

class UserService {

  getAllUser(): Promise<User[]> {
    return new Promise((resolve, rejects) => {
      userRepository.getAllUsers().then((user: User[]) => {
        console.log(JSON.stringify(user))
        resolve(user)
      }).catch(err => {
        console.error("Err: " + err)
        rejects("database_error")
      })
    })
  }

  createUser(user: User): Promise<User> {
    return new Promise((resolve, rejects) => {
      userRepository.getUserByEmail(user.email).then((userFromDB: User) => {
        userRepository.createUser(user).then((resultValue: User) => {
          resolve(resultValue)
        }).catch((err: Error) => {
          rejects(err)
        })
      }).catch((err: Error) => {
        rejects(err)
      })

    });
  }

  getUser(userId: string): Promise<User> {
    return new Promise((resolve, rejects) => {
      userRepository.getUser(userId).then((user: User[]) => {
          resolve(user[0])
      }).catch((err: Error) => {
        rejects(err)
      })
    });
  }

  updateUser(userUpdateData: User, userId: string): Promise<User> {
    return new Promise(async (resolve, rejects) => {
      userRepository.getUser(userId).then((user: User[]) => {
        userRepository.updateUser(userUpdateData, userId).then((updatedUser) => {
          resolve(updatedUser)
        }).catch((err: Error) => {
          rejects(err)
        })
      }).catch((err: Error) => {
        rejects(err)
      })
    });
  }

  deleteUser(userId: string): Promise<User> {
    return new Promise((resolve, rejects) => {
      userRepository.getUser(userId).then((user: User[]) => {
        userRepository.deleteUser(userId).then((deletedUser: User) => {
          resolve(deletedUser)
        }).catch((err: Error) => {
          rejects(err)
        })
      }).catch((err: Error) => {
        rejects(err)
      })
        
    })
  }
}

const userService = new UserService();
export default userService;
