export class ProfileModel {
    id: number = -1;
    email: string = '';
    name: string = '';
    surname: string = '';
    roles: string[] = [];
    constructor(data?:any) {
        Object.assign(this, data)
    }
}