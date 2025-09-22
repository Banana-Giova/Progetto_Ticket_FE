export class LoginModel {
    email: string = "";
    password: string = "";

    constructor(data?:any){
        Object.assign(this, data)
    }

    isValidPassword(){
        return  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,24}$/.test(this.password);
    }

    isValidEmail(){
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/.test(this.email);
        
    }

    
}