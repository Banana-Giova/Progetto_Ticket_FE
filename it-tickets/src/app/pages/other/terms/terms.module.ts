import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Terms } from './terms';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [ Terms ],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [ Terms ]
})
export class TermsModule { }