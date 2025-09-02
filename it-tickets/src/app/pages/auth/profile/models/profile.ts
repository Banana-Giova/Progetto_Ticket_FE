export class ProfileModel {
    name: String = '';
    surname: String = '';
    email: String = '';
    role: String = '';
    constructor(data?:any) {
        Object.assign(this, data)
    }
}