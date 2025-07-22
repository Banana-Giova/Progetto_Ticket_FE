import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginModel } from "./models/login.moldel";
import { enviroments } from "../../../enviroments/enviroment.dev";
import { Observable } from "rxjs";

@Injectable ({
    
    providedIn: "root"
})


export class LoginAPIService {

  constructor(private http: HttpClient){}

  login$(model: LoginModel): Observable<any> {
    return this.http.post<any>(enviroments.baseUrl + enviroments.login, model);
  }

}