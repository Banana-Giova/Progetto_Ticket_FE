import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login } from './login';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    Login
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatIcon,
    MatButtonModule,
    FormsModule,
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