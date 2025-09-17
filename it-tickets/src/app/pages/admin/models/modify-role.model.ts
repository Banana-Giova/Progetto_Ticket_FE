export class ModifyRoleModel {
    email: string = '';
    roleName: string = '';
  
     constructor(data?:any) {
        Object.assign(this, data)
    }
}