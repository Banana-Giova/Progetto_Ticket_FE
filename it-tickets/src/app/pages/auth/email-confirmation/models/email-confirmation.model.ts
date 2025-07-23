export class EmailConfirmationModel {
    token: string = '';
    constructor(data?:any) {
        Object.assign(this, data)
    }
}