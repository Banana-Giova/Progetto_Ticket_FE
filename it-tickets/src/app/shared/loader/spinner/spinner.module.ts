import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Spinner } from './spinner';


@NgModule({
  declarations: [ Spinner ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
  ],
  exports: [ Spinner ]
})
export class SpinnerModule { }
