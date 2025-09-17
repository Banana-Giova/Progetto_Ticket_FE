export class RegisterModel {
    name: string = '';
    surname: string = '';
    email: string = '';
    newPassword: string = '';
    confirmPassword: string = '';

    constructor(data?:any) {
        Object.assign(this, data)
    }

    isValidPassword = (): boolean => {
        if (this.newPassword != this.confirmPassword) { return false };
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,24}$/.test(this.newPassword);
    }

    isValidEmail = (): boolean => {
        return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(this.email);
    }

    isAllValid = (): boolean => {
        if (this.name.length == 0 || this.surname.length == 0) { return false }
        return this.isValidEmail() && this.isValidPassword();
    }

    isDirty = (): boolean => {
        if (
            (this.name ||
            this.surname ||
            this.email ||
            this.newPassword ||
            this.confirmPassword) != ''
        ) {return true;}
        return false;
    }

    clear = () => {
        this.name = "";
        this.surname = "";
        this.email = "";
        this.newPassword = "";
        this.confirmPassword = "";
    }
}