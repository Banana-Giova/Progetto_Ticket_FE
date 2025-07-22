import { Component, ElementRef, ViewChild } from '@angular/core';
import { RegisterModel } from './models/register.model';
import { RegisterAPIService } from './services/register.api.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css'
})

export class Register {
  model: RegisterModel = new RegisterModel();
  hide: boolean = true;

  constructor(private registerApi: RegisterAPIService) {}

  register = () => {
    this.registerApi.register$(this.model).subscribe();
  }
}
