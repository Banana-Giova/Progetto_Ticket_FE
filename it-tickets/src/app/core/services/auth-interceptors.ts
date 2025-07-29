import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { UserStorageService } from "../../pages/auth/services/user.storage";

@Injectable()

export class AuthorizationInterceptor implements HttpInterceptor {
    constructor(private storageService: UserStorageService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token=this.storageService.getToken();
        console.log("token caricato:", token)
        //clona la richeista 
        if (!token || req.url.includes('/login') || req.url.includes('/register') || req.url.includes("/email-confirmation") || req.url.includes("/forgot-password"))
             return next.handle(req)
        const authReq = req.clone({ 
            setHeaders: { 
                Authorization: `Bearer ${token}` } });

        return next.handle(authReq).pipe(
        tap((event) => {
        if (event instanceof HttpResponse) {
          const refreshtoken = event.headers.get('X-Refresh-Token');
          if (refreshtoken?.startsWith('Bearer ')) {
            this.storageService.saveToken(refreshtoken);
          }
        }
      })
    );
  }
}