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
//# sourceMappingURL=userValidator.js.map