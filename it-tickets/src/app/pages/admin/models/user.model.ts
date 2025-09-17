export class UserInListModel {
  id: number = -1;
  name: string = "";
  surname: string = "";
  email: string = "";
  emailConfirmed: boolean = true;
  roles: { id: number; name: string }[] = [];
  highestRole: string = "";
  isOperator: boolean = false;
  isAdmin: boolean = false;
  roleString: string = "";

  constructor(data?: any) {
    Object.assign(this, data);

    this.isOperator = this.roles?.some(r => r.name === "Operatore") ?? false;
    this.isAdmin = this.roles?.some(r => r.name === "Amministratore") ?? false;
    this.roleString = this.roles.map(role => role.name).join(', ');
  }

  public computeRole = ():void => {
    if (this.isAdmin) {
      this.highestRole = "Amministratore";
    } else if (this.isOperator) {
      this.highestRole = "Operatore";
    } else {
      this.highestRole = "Utente";
    }
  }
}