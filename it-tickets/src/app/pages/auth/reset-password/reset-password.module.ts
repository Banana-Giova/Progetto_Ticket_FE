import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ResetPassword } from './reset-password';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UnsavedChangesGuard } from '../../../core/guards/unsaved.guard';

@NgModule({
  declarations: [ ResetPassword ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    RouterModule.forChild([
      { path: '', component: ResetPassword, canDeactivate: [UnsavedChangesGuard] }
    ])
  ],
  exports: [ ResetPassword ]
})
export class ResetPasswordModule { }
