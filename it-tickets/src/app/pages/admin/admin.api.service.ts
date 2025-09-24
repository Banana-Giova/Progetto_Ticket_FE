import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environments } from "../../../environments/environment.dev";
import { ModifyRoleModel } from "./models/modify-role.model";
import { UserInListModel } from "./models/user.model";

@Injectable ({
    providedIn: "root"
})

export class AdminAPIService {
  constructor(private http: HttpClient){}

  getUsersList$(pageIndex: number, pageSize: number, keyword?: string, roleName?: string): Observable<{content: UserInListModel[]; totalElements: number }>  {
    let params = new HttpParams()
      .set('page', pageIndex.toString())
      .set('size', pageSize.toString());

      if (keyword) params = params.set('keyword', keyword);
      if (roleName) params = params.set('roleName', roleName);
      
    return this.http.get<{content: UserInListModel[]; totalElements: number }>((environments.baseUrl + environments.adminUrl + environments.getUsersList), {params});
  }

  getRoles$() {
    return this.http.get<any>(environments.baseUrl + environments.rolesUrl + environments.getAllRoles);
  }

  assignRole$(model: ModifyRoleModel) {
    return this.http.post<any>(environments.baseUrl + environments.rolesUrl + environments.assignRole, model);
  }

  removeRole$(model: ModifyRoleModel) {
    return this.http.post<any>(environments.baseUrl + environments.rolesUrl + environments.removeRole, model);
  }
}