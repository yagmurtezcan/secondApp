"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
class MailService {
    constructor() {
        this.mailBody = {
            from: "besttesterever@outlook.com",
            to: "ygmrtzcn@gmail.com",
            subject: "Test from Nodemailer",
            text: "text text text"
        };
        this.mailTransporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: "besttesterever@outlook.com",
                pass: "Besttester123"
            }
        });
    }
    sendMail() {
        return new Promise((resolve, rejects) => {
            this.mailTransporter.sendMail(this.mailBody, (err) => {
                if (err) {
                    console.log("error occured while sending email");
                }
                else {
                    console.log("email has been sent");
                }
            });
        });
    }
}
const mailService = new MailService();
exports.default = mailService;
//# sourceMappingURL=emailService.js.map