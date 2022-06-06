import User from "../interface/IUser"
import userService from "./UserService"

class FileUploadService {
    loadProfilePhoto(profilePhoto: any, user: User, userId: number): Promise<User[]> {
        return new Promise((resolve, rejects) => {
            user.image = profilePhoto
            userService.updateUser(user, userId).then((updatedUser: User[]) => {
                resolve(updatedUser)
            }).catch((err: Error) => {
                rejects(err)
            })
        })
    }
}

const fileUploadService = new FileUploadService()
export default fileUploadService