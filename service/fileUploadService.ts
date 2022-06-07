class FileUploadService {
    loadProfilePhoto(profilePhoto: any): Promise<any> {
        return new Promise((resolve, rejects) => {
          if(profilePhoto){
              resolve(profilePhoto)
          } else {
              rejects("please select profile photo")
          }
        })
    }
}

const fileUploadService = new FileUploadService()
export default fileUploadService