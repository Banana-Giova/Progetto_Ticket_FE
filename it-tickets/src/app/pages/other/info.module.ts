import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Privacy } from './privacy/privacy';
import { MatCardModule } from '@angular/material/card';
import { Terms } from './terms/terms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ 
    Privacy,
    Terms ],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule.forChild([
      { path: "privacy", component: Privacy },
      { path: "terms", component: Terms }
    ]),
  ]
})
export class InfoModule { }