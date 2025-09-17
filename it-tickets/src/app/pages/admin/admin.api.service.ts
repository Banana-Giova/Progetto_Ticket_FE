import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { enviroments } from "../../../enviroments/enviroment.dev";
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
      
    return this.http.get<{content: UserInListModel[]; totalElements: number }>((enviroments.baseUrl + enviroments.adminUrl + enviroments.getUsersList), {params});
  }

  getRoles$() {
    return this.http.get<any>(enviroments.baseUrl + enviroments.rolesUrl + enviroments.getAllRoles);
  }

  assignRole$(model: ModifyRoleModel) {
    return this.http.post<any>(enviroments.baseUrl + enviroments.rolesUrl + enviroments.assignRole, model);
  }

  removeRole$(model: ModifyRoleModel) {
    return this.http.post<any>(enviroments.baseUrl + enviroments.rolesUrl + enviroments.removeRole, model);
  }
}