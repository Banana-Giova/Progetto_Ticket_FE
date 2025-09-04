export class OnlyEmailModel {
    email: string = "";

    constructor(data?:any){
        Object.assign(this, data)
    }

    isValidEmail(){
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/.test(this.email);
        
    }

}