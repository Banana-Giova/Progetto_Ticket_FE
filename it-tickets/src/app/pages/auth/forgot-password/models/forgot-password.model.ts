export class ForgotPasswordModel {
    userEmail: string = '';

    constructor(data?:any) {
        Object.assign(this, data)
    }

    isValidEmail = () => {
        return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(this.userEmail);
    }
}