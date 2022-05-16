"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidator = void 0;
class UserValidator {
    constructor(firstName, lastName, age, email) {
        this.firstNameControl = () => {
            if (this.firstName.length < 2 || !this.firstName) {
                return true;
            }
            else {
                return false;
            }
        };
        this.lastNameControl = () => {
            if (this.lastName.length < 2 || !this.lastName) {
                return true;
            }
            else {
                return false;
            }
        };
        this.emailControl = () => {
            let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!this.email.match(emailRegex)) {
                return true;
            }
            else {
                return false;
            }
        };
        this.ageControl = () => {
            if (!this.age) {
                return true;
            }
            else {
                return false;
            }
        };
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.age = age;
    }
}
exports.UserValidator = UserValidator;
// {
//   "name": "secondapp",
//   "version": "1.0.0",
//   "description": "",
//   "main": "index.js",
//   "scripts": {
//     // "serve": "nodemon app.ts"
//     "dev": "nodemon",
//     "start": "npm run build && node build/index.js",
//   },
//   "keywords": [],
//   "author": "",
//   "license": "ISC",
//   "devDependencies": {
//     "@types/express": "^4.17.13",
//     "@types/node": "^17.0.33",
//     "@types/uuid": "^8.3.4",
//     "nodemon": "^2.0.16",
//     "ts-node": "^10.7.0",
//     "typescript": "^4.6.4"
//   },
//   "dependencies": {
//     "express": "^4.18.1",
//     "uuid": "^8.3.2"
//   }
// }
