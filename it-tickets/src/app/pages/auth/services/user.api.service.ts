import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginModel } from "../login/models/login.model";
import { Observable } from "rxjs";
import { RegisterModel } from "../register/models/register.model";
import { environments } from "../../../../environments/environment.dev";
import { EmailConfirmationModel } from "../email-confirmation/models/email-confirmation.model";
import { ResetPasswordModel } from "../reset-password/models/reset-password.model";
import { ForgotPasswordModel } from "../forgot-password/models/forgot-password.model";
import { TicketModel } from "../../ticket/models/ticket.model";
import { LogoutModel } from "../../../core/services/models/logout.model";

@Injectable({
  providedIn: "root"
})

export class UserAPIService {
  constructor(private http: HttpClient) { }

  login$(model: LoginModel): Observable<any> {
    return this.http.post<any>(environments.baseUrl + environments.login, model);
  }

  logout$(model: LogoutModel): Observable<any> {
    return this.http.post<any>(environments.baseUrl + environments.logout, model);
  }

  register$(model: RegisterModel): Observable<any> {
    return this.http.post<any>(environments.baseUrl + environments.register, model);
  }

  confirmEmail$(model: EmailConfirmationModel): Observable<any> {
    return this.http.post<any>(environments.baseUrl + environments.emailConfirmation, model);
  }

  resetPassword$(model: ResetPasswordModel): Observable<any> {
    return this.http.post<any>(environments.baseUrl + environments.resetPassword, model);
  }

  forgotPassword$(model: ForgotPasswordModel): Observable<any> {
    return this.http.post<any>(environments.baseUrl + environments.forgotPassword, model);
  }

  profileFetch$(): Observable<any> {
    return this.http.get<any>(environments.baseUrl + environments.profileFetch);
  }

  markAsRead$(notifId: number): Observable<any> {
    return this.http.patch<any>(environments.baseUrl + environments.notificationUrl + environments.markAsRead, notifId)
  }

  getPending$(userEmail: String): Observable<any> {
    return this.http.get<any>(environments.baseUrl + environments.notificationUrl + userEmail + environments.getPending);
  }

  getAlreadyRead$(userEmail: String): Observable<any> {
    return this.http.get<any>(environments.baseUrl + environments.notificationUrl + userEmail + environments.getAlreadyRead);
  }

  getCategories$() {
    return this.http.get<any>(environments.baseUrl + environments.getCategories);
  }

  // getUTickets$() {
  //   return this.http.get<any>(environments.baseUrl + environments.getTickets)
  // }
  getTicketById$(id: number): Observable<TicketModel> {
    return this.http.get<TicketModel>(environments.baseUrl + environments.ticketUrl + id)
  }
  // getTicketById$(id: number): Observable<TicketModel> {
  //   return this.http.get<TicketModel>(`${environments.baseUrl}ticket/${id}`);
  // }


  getStatus$() {
    return this.http.get<any>(environments.baseUrl + environments.ticketUrl + environments.getStatus);
  }

  addTicket$(model: TicketModel): Observable<any> {
    return this.http.post<any>(environments.baseUrl + environments.ticketUrl + environments.addTicket, model);
  }

  updateDescription$(id: number, newDescription: string): Observable<any> {
    return this.http.patch<any>(environments.baseUrl + environments.ticketUrl + id + environments.updateDescrpition, {newDescription});
  }

  updateStatus$(id: number, newStatus: string): Observable<any> {
    return this.http.patch<any>(environments.baseUrl + environments.ticketUrl + id + environments.updateStatus, {newStatus});
  }

  getTickets$(pageIndex: number, pageSize: number, isAllTickets: boolean, keyword?: string, categoryName?: string, status?: string): Observable<{ content: TicketModel[]; totalElements: number }> {
    let params = new HttpParams()
      .set('page', pageIndex.toString())
      .set('size', pageSize.toString())
      .set('isAllTickets', isAllTickets.toString());

    if (keyword) params = params.set('keyword', keyword);
    if (categoryName) params = params.set('categoryName', categoryName);
    if (status) params = params.set('status', status);

    return this.http.get<{ content: TicketModel[]; totalElements: number }>((environments.baseUrl + environments.ticketUrl + environments.getTickets), { params });
  }

  getChart$() {
    return this.http.get<any>(environments.baseUrl + environments.ticketUrl + environments.getChart);
  }
}