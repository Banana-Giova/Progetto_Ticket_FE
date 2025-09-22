import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Privacy } from './privacy';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [ Privacy ],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [ Privacy ]
})
export class PrivacyModule { }