export class RegisterModel {
    name: string = '';
    surname: string = '';
    email: string = '';
    newPassword: string = '';
    confirmPassword: string = '';

    constructor(data?:any) {
        Object.assign(this, data)
    }

    isValidPassword = () => {
        if (this.newPassword != this.confirmPassword) { return false };
        return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,24}$/.test(this.newPassword);
    }

    isValidEmail = () => {
        return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(this.email);
    }

    isAllValid = () => {
        if (this.name.length == 0 || this.surname.length == 0) { return false }
        return this.isValidEmail() && this.isValidPassword();
    }
}