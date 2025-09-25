import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginModel } from "../login/models/login.model";
import { Observable } from "rxjs";
import { RegisterModel } from "../register/models/register.model";
import { enviroments } from "../../../../enviroments/enviroment.dev";
import { EmailConfirmationModel } from "../email-confirmation/models/email-confirmation.model";
import { ResetPasswordModel } from "../reset-password/models/reset-password.model";
import { ForgotPasswordModel } from "../forgot-password/models/forgot-password.model";
import { TicketModel } from "../../ticket/models/ticket.model";

@Injectable({
  providedIn: "root"
})

export class UserAPIService {
  constructor(private http: HttpClient) { }

  login$(model: LoginModel): Observable<any> {
    return this.http.post<any>(enviroments.baseUrl + enviroments.login, model);
  }

  register$(model: RegisterModel): Observable<any> {
    return this.http.post<any>(enviroments.baseUrl + enviroments.register, model);
  }

  confirmEmail$(model: EmailConfirmationModel): Observable<any> {
    return this.http.post<any>(enviroments.baseUrl + enviroments.emailConfirmation, model);
  }

  resetPassword$(model: ResetPasswordModel): Observable<any> {
    return this.http.post<any>(enviroments.baseUrl + enviroments.resetPassword, model);
  }

  forgotPassword$(model: ForgotPasswordModel): Observable<any> {
    return this.http.post<any>(enviroments.baseUrl + enviroments.forgotPassword, model);
  }

  profileFetch$(): Observable<any> {
    return this.http.get<any>(enviroments.baseUrl + enviroments.profileFetch);
  }

  getCategories$() {
    return this.http.get<any>(enviroments.baseUrl + enviroments.getCategories);
  }

  // getUTickets$() {
  //   return this.http.get<any>(enviroments.baseUrl + enviroments.getTickets)
  // }
  getTicketById$(id: number): Observable<TicketModel> {
    return this.http.get<TicketModel>(enviroments.baseUrl + enviroments.ticketUrl + id)
  }
  // getTicketById$(id: number): Observable<TicketModel> {
  //   return this.http.get<TicketModel>(`${enviroments.baseUrl}ticket/${id}`);
  // }


  getStatus$() {
    return this.http.get<any>(enviroments.baseUrl + enviroments.ticketUrl + enviroments.getStatus);
  }

  addTicket$(model: TicketModel): Observable<any> {
    return this.http.post<any>(enviroments.baseUrl + enviroments.ticketUrl + enviroments.addTicket, model);
  }

  updateDescription$(id: number, newDescription: string): Observable<any> {
    return this.http.patch<any>(enviroments.baseUrl + enviroments.ticketUrl + id + enviroments.updateDescrpition, {newDescription});
  }

  updateStatus$(id: number, newStatus: string): Observable<any> {
    return this.http.patch<any>(enviroments.baseUrl + enviroments.ticketUrl + id + enviroments.updateStatus, {newStatus});
  }

  updateStatusDeleted$(id: number, deletedStatus: string): Observable<any> {
    return this.http.patch<any>(enviroments.baseUrl + enviroments.ticketUrl+ id + enviroments.updateStatusDeleted, {deletedStatus})
  }


  getTickets$(pageIndex: number, pageSize: number, isAllTickets: boolean, keyword?: string, categoryName?: string, status?: string): Observable<{ content: TicketModel[]; totalElements: number }> {
    let params = new HttpParams()
      .set('page', pageIndex.toString())
      .set('size', pageSize.toString())
      .set('isAllTickets', isAllTickets.toString());

    if (keyword) params = params.set('keyword', keyword);
    if (categoryName) params = params.set('categoryName', categoryName);
    if (status) params = params.set('status', status);

    return this.http.get<{ content: TicketModel[]; totalElements: number }>((enviroments.baseUrl + enviroments.ticketUrl + enviroments.getTickets), { params });
  }

  getChart$() {
    return this.http.get<any>(enviroments.baseUrl + enviroments.ticketUrl + enviroments.getChart);
  }
}