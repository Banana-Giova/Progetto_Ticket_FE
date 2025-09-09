export class ResetPasswordModel {
    userEmail: string = '';
    passwordToken: string = '';
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
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,24}$/.test(this.newPassword);
    }

    isDirty = (): boolean => {
        if (
            (this.oldPassword ||
            this.newPassword ||
            this.confirmPassword) != ''
        ) {return true;}
        return false;
    }
}