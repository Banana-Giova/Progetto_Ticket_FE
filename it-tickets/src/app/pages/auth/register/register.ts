import { Component } from '@angular/core';
import { RegisterModel } from './models/register.model';
import { UserAPIService } from '../services/user.api.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css'
})

export class Register {
  model: RegisterModel = new RegisterModel();
  hide: boolean = true;

  constructor(private service: UserAPIService) {}

  register = () => {
    this.service.register$(this.model).subscribe();
  }
}
