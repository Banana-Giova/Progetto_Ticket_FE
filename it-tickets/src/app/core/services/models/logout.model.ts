export class LogoutModel {
    userEmail: string = '';

    constructor(data?:any) {
        Object.assign(this, data)
    }
}