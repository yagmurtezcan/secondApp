import { ProductNotFoundException } from "../src/common/http.exception"

class FileUploadService {
    loadProfilePhoto(profilePhoto: any): Promise<any> {
        return new Promise((resolve, rejects) => {
          if(profilePhoto){
              resolve(profilePhoto)
          } else {
              rejects(new ProductNotFoundException("Please select profile photo"))
          }
        })
    }
}

const fileUploadService = new FileUploadService()
export default fileUploadService