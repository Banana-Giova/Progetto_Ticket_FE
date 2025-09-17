import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserInListModel } from '../models/user.model';
import { UserAPIService } from '../../auth/services/user.api.service';
import { forkJoin, of, throwError } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { ModifyRoleModel } from '../models/modify-role.model';
import { NotificationService } from '../../../shared/toasts/notification.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.html',
  styleUrls: ['./user-detail.css'],
  standalone: false
})

export class UserDetail {
  public data: UserInListModel;

  isOperator: boolean;
  isAdmin: boolean;

  originalIsOperator: boolean;
  originalIsAdmin: boolean;

  saving = false;
  errorMsg: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) rawData: any,
    private dialogRef: MatDialogRef<UserDetail>,
    private roleApi: UserAPIService,
    private notify: NotificationService
  ) {
    this.data = new UserInListModel(rawData);

    this.originalIsOperator = this.data.isOperator;
    this.originalIsAdmin = this.data.isAdmin;

    this.isOperator = this.originalIsOperator;
    this.isAdmin = this.originalIsAdmin;
  }

  get changed(): boolean {
    return this.isOperator !== this.originalIsOperator ||
           this.isAdmin !== this.originalIsAdmin;
  }

  // // handler opzionali per logica al toggle
  // onOperatorToggle(): void {
  //   this.errorMsg = null;
  // }

  // onAdminToggle(): void {
  //   this.errorMsg = null;
  // }

  dismiss(): void {
    this.dialogRef.close(false);
  }

  save(): void {
    this.errorMsg = null;

    if (this.originalIsAdmin && !this.isAdmin) {
      this.errorMsg = "Il ruolo 'Amministratore' non può essere rimosso da qui.";
      return;
    }

    // Costruisco le operazioni necessarie
    const ops = [];

    // Operatore
    if (this.isOperator && !this.originalIsOperator) {
      ops.push(this.roleApi.assignRole$(
        {email: this.data.email, 
         roleName: 'Operatore'} as ModifyRoleModel
      ).pipe(
        catchError(err => { return of({ error: err, role: 'Operatore', action: 'assign' }); })
      ));
    } else if (!this.isOperator && this.originalIsOperator) {
      ops.push(this.roleApi.removeRole$(
        {email: this.data.email, 
         roleName: 'Operatore'} as ModifyRoleModel
      ).pipe(
        catchError(err => { return of({ error: err, role: 'Operatore', action: 'remove' }); })
      ));
    } else if (!this.data.emailConfirmed) {
      this.errorMsg = "Impossibile assegnare 'Operatore', mail non confermata.";
      return;
    }

    // Amministratore
    if (this.isAdmin && !this.originalIsAdmin) {
      ops.push(this.roleApi.assignRole$(
        {email: this.data.email, 
         roleName: 'Amministratore'} as ModifyRoleModel
      ).pipe(
        catchError(err => { return of({ error: err, role: 'Amministratore', action: 'assign' }); })
      ));
    } else if ((!this.isAdmin && this.originalIsAdmin)) {
      this.errorMsg = "Il ruolo 'Amministratore' non può essere rimosso da qui.";
      return;
    } else if (!this.data.emailConfirmed) {
      this.errorMsg = "Impossibile assegnare 'Amministratore', mail non confermata.";
      return;
    }

    if (ops.length === 0) {
      this.notify.info('Nessuna modifica da salvare');
      this.dialogRef.close(false);
      return;
    }

    this.saving = true;

  forkJoin(ops).pipe(
    map((results: any[]) => {
      const errors = results.filter(r => r && r.error);
      if (errors.length > 0) {
        throw { type: 'partial', errors };
      }
      return results;
    }),
    tap(() => this.notify.success('Ruoli aggiornati con successo')),
    map(() => ({
      ...this.data,
      isOperator: this.isOperator,
      isAdmin: this.isAdmin
    })),
    catchError((err) => {
      if (err && err.type === 'partial') {
        console.error('Role ops errors', err.errors);
        this.errorMsg = "Errore durante l'aggiornamento dei ruoli. Controlla i log.";
        this.notify.error('Errore durante il salvataggio dei ruoli');
        return of(null);
      } else {
        const msg = err?.error?.message || err?.message || 'Errore sconosciuto';
        this.notify.error('Modifica ruoli fallita: ' + this.notify.checkBackend(msg));
        return throwError(() => err);
      }
    }),
    finalize(() => {
      this.saving = false
      this.dialogRef.close(true);
  })
  ).subscribe();
  }
}
