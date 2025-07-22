import { Component, ElementRef, signal, ViewChild, viewChild } from '@angular/core';
import { LoginModel } from './models/login.moldel';
import { LoginAPIService } from './login.api.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  model = new LoginModel();
  hide = true;

  constructor(private loginService:LoginAPIService){}

   login() {
     this.loginService.login$(this.model).subscribe();
   }

  checkValidFields(labelEmail?:HTMLElement, labelPassword?: HTMLElement){
    if(!this.model.isValidEmail() && labelEmail ) {
      debugger;
      labelEmail.style = "color:red!important;"
    }

    if(!this.model.isValidPassword() && labelPassword) {
      debugger;
      labelPassword.style = "color:red!important;"
    }


  }

}

