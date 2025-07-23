import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginModel } from "../login/models/login.model";
import { Observable } from "rxjs";
import { RegisterModel } from "../register/models/register.model";
import { enviroments } from "../../../../enviroments/enviroment.dev";
import { EmailConfirmationModel } from "../email-confirmation/models/email-confirmation.model";

@Injectable ({
    
    providedIn: "root"
})


export class UserAPIService {

  constructor(private http: HttpClient){}

  login$(model: LoginModel): Observable<any> {
    return this.http.post<any>(enviroments.baseUrl + enviroments.login, model);
  }

  register$(model: RegisterModel): Observable<any> {
    return this.http.post<any>(enviroments.baseUrl + enviroments.register, model)
  }
  
  confirmEmail$(model: EmailConfirmationModel): Observable<any> {
    return this.http.post<any>(enviroments.baseUrl + enviroments.emailConfirmation, model)
  }

}