import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginModel } from "../login/models/login.model";
import { Observable } from "rxjs";
import { RegisterModel } from "../register/models/register.model";
import { enviroments } from "../../../../enviroments/enviroment.dev";
import { EmailConfirmationModel } from "../email-confirmation/models/email-confirmation.model";
import { ResetPasswordModel } from "../reset-password/models/reset-password.model";
import { ForgotPasswordModel } from "../forgot-password/models/forgot-password.model";

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

  resetPassword$(model: ResetPasswordModel): Observable<any> {
    return this.http.post<any>(enviroments.baseUrl + enviroments.resetPassword, model)
  }

  forgotPassword$(model: ForgotPasswordModel): Observable<any> {
    return this.http.post<any>(enviroments.baseUrl + enviroments.forgotPassword, model)
  }
  
  test() {
    return this.http.get<any>(enviroments.baseUrl+ "test")
  }

}