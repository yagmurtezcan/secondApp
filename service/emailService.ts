import nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer"

class MailService {
    mailTransporter!: Mail

    mailBody = {
        from: "besttesterever@outlook.com",
        to: "ygmrtzcn@gmail.com",
        subject: "Test from Nodemailer",
        text: "text text text"
    }
    
    constructor() {
        this.mailTransporter = nodemailer.createTransport({
            service: "hotmail",
            auth: {
                user: "besttesterever@outlook.com",
                pass: "Besttester123"
            }
        })
    }

    sendMail(): Promise<any> {
        return new Promise((resolve, rejects) => {
            this.mailTransporter.sendMail(this.mailBody, (err) => {
                if(err) {
                    console.log("error occured while sending email")
                } else {
                    console.log("email has been sent")
                }
            })
        })
    }
}

const mailService = new MailService()
export default mailService