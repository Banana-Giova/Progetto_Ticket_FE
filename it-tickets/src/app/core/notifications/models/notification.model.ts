export class UserNotification {
  id: number = -1;
  destination: string = '';
  message: string = '';
  read: boolean = false;
  createdAt: string = '';

  constructor(data?:any) {
    Object.assign(this, data)
  }
}
