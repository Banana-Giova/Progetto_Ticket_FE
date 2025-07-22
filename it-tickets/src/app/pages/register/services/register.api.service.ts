import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RegisterModel } from "../models/register.model";
import { Observable } from "rxjs";
import { enviroments } from "../../../../enviroments/enviroment.dev";

@Injectable({
    providedIn: 'root'
})

export class RegisterAPIService {

    constructor(private http: HttpClient){}

    register$(model: RegisterModel): Observable<any> {
        return this.http.post<any>(enviroments.baseUrl + enviroments.register, model)
    }
}