import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Register } from './register';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatGridList } from '@angular/material/grid-list';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [ Register ],
  imports: [
    CommonModule,
    FormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatCard,
    MatGridList,
    MatIcon,
    MatIconModule,
    MatButtonModule,
    MatButton,
   
    RouterModule.forChild([
      { path: '', component: Register }
    ])
  ],
  exports: [ Register ]
})
export class RegisterModule { }
