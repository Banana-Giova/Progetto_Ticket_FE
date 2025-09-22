export class RoleModel {
    id: number = 0;
    name: string = "";
  
     constructor(data?:any) {
        Object.assign(this, data)
    }
}