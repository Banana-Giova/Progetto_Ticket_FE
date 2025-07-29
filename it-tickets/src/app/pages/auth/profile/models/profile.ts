export class ProfileModel {
    token: string = '';
    constructor(data?:any) {
        Object.assign(this, data)
    }
}