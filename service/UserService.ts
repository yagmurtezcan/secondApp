import User from "../interface/IUser";
import userRepository from "../repository/userRepository";
import bcrypt from "bcrypt"

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

  createUser(user: User, fileName: any): Promise<User[]> {
    return new Promise(async (resolve, rejects) => {
      userRepository.getUserByEmail(user.email).then(async (userFromDB: User[]) => {

        // create hashed password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(user.password, salt)
        user.password = hashedPassword

        //upload photo
        // user.image = fileName.filename

        userRepository.createUser(user).then((resultValue: User[]) => {
          resolve(resultValue)
        }).catch((err: Error) => {
          rejects(err)
        })
      }).catch((err: Error) => {
        rejects(err)
      })

    });
  }

  getUser(userId: number): Promise<User[]> {
    return new Promise((resolve, rejects) => {
      userRepository.getUser(userId).then((user: User[]) => {
          resolve(user)
      }).catch((err: Error) => {
        rejects(err)
      })
    });
  }

  updateUser(userUpdateData: User, userId: number): Promise<User[]> {
    return new Promise(async (resolve, rejects) => {
      userRepository.getUser(userId).then((user: User[]) => {
        userRepository.updateUser(userUpdateData, userId).then((updatedUser: User[]) => {
          resolve(updatedUser)
        }).catch((err: Error) => {
          rejects(err)
        })
      }).catch((err: Error) => {
        rejects(err)
      })
    });
  }

  deleteUser(userId: number): Promise<number> {
    return new Promise((resolve, rejects) => {
      userRepository.getUser(userId).then((user: User[]) => {
        userRepository.deleteUser(userId).then((deletedUser: number) => {
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