import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginModel } from "../login/models/login.model";
import { Observable } from "rxjs";
import { RegisterModel } from "../register/models/register.model";
import { enviroments } from "../../../../enviroments/enviroment.dev";
import { EmailConfirmationModel } from "../email-confirmation/models/email-confirmation.model";
import { ResetPasswordModel } from "../reset-password/models/reset-password.model";
import { ForgotPasswordModel } from "../forgot-password/models/forgot-password.model";
import { OnlyEmailModel } from "../login/models/onlyEmail.model";
import { TicketModel } from "../../ticket/models/ticket.model";
import { CategoryModel } from "../../ticket/models/category.model";
import { Tickets } from "../../ticket/components/tickets/tickets";

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

  profileFetch$(): Observable<any> {
    return this.http.get<any>(enviroments.baseUrl + enviroments.profileFetch);
  }
  
  // Testing

  test() {
    return this.http.get<any>(enviroments.baseUrl+ "test")
  }

  add_operator_test() {
    return this.http.get<any>(enviroments.baseUrl+ "roles/add_operator_test")
  }

  remove_operator_test() {
    return this.http.get<any>(enviroments.baseUrl+ "roles/remove_operator_test")
  }
  addTicket$(model: TicketModel): Observable<any> {
    return this.http.post<any>(enviroments.baseUrl + enviroments.addTicket, model)
  }

  getCategories$() {
    return this.http.get<any>(enviroments.baseUrl + enviroments.getCategories)
  }

  // getUTickets$() {
  //   return this.http.get<any>(enviroments.baseUrl + enviroments.getTickets)
  // }
  // getTicketById$(id: number): Observable<TicketModel> {
  //   return this.http.get<TicketModel>(enviroments.baseUrl + enviroments.getTicketById)
  // }
  getTicketById$(id: number): Observable<TicketModel> {
  return this.http.get<TicketModel>(`${enviroments.baseUrl}ticket/${id}`);
}


  getStatus$() {
    return this.http.get<any>(enviroments.baseUrl+ enviroments.gestStatus)
  }

  getTickets$(pageIndex: number, pageSize: number, keyword?: string, categoryName?: string, status?: string): Observable<{content: TicketModel[]; totalElements: number }>  {
    let params = new HttpParams()
      .set('page', pageIndex.toString())
      .set('size', pageSize.toString());

      if (keyword) params = params.set('keyword', keyword);
      if (categoryName) params = params.set('categoryName', categoryName);
      if (status) params = params.set('status', status);

      
    return this.http.get<{content: TicketModel[]; totalElements: number }>((enviroments.baseUrl + enviroments.getTickets), {params});
  }

}