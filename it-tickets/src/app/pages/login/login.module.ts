import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login } from './login';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    Login
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    RouterModule.forChild([
    {
        path: "",
        component: Login
    }

    ])

  ]
})
export class LoginModule {
}