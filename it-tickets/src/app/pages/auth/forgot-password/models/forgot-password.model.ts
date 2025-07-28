export class ForgotPasswordModel {
    userEmail: string = '';
    oldPassword: string = '';
    newPassword: string = '';
    confirmPassword: string = '';

    constructor(data?:any) {
        Object.assign(this, data)
    }

    isValidPassword = () => {
        if (
            this.newPassword != this.confirmPassword ||
            this.newPassword === this.oldPassword
        ) { return false };
        return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,24}$/.test(this.newPassword);
    }
}