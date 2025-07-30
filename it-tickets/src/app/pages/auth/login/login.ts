import { Component, OnInit } from '@angular/core';
import { LoginModel } from './models/login.model';
import { UserAPIService } from '../services/user.api.service';
import { tap } from 'rxjs/operators';
import { UserStorageService } from '../services/user.storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit {
  model = new LoginModel();
  hide = true;

  constructor(
    private loginService: UserAPIService,
    private userStorage: UserStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loginService.test().subscribe();

    }, 60.000)
  }

  login() {
    this.loginService.login$(this.model).pipe(
      tap((resp) => {
        this.userStorage.saveToken(resp.token)
        this.router.navigate(["/ticket/create"])
      })
    ).subscribe();

  }




  // checkValidFields(labelEmail?:HTMLElement, labelPassword?: HTMLElement){
  //   if(!this.model.isValidEmail() && labelEmail ) {
  //     debugger;
  //     labelEmail.style = "color:red!important;"
  //   }

  //   if(!this.model.isValidPassword() && labelPassword) {
  //     debugger;
  //     labelPassword.style = "color:red!important;"
  //   }


  // }

}

