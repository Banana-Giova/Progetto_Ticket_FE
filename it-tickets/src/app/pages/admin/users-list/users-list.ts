import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { catchError, filter, finalize, of, tap, throwError } from 'rxjs';
import { AdminAPIService } from '../admin.api.service';
import { UserDetail } from '../user-detail/user-detail';
import { UserInListModel } from '../models/user.model';
import { RoleModel } from '../models/role.model';
import { NotificationService } from '../../../shared/toasts/notification.service';


@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './users-list.html',
  styleUrl: './users-list.css'
})
export class UsersList implements OnInit{

  usersList: UserInListModel[] = [];
  displayedColumns: string[] = ['highestRole','email', 'name','surname','details' ];
  totalUsers = 0;
  pageSize = 10;
  pageIndex = 0;

  searchKeyword: string = '';
  selectedRole: string = '';

  roles: RoleModel[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private dialog: MatDialog, 
    private service: AdminAPIService,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadFilters();
  }

  reloadUsers = () => {
    this.loadUsers();
  }

  openUserDetails(selected_user: UserInListModel): void {
    const dialogRef = this.dialog.open(UserDetail, {
      data: selected_user
    });

    dialogRef.afterClosed().pipe(
      tap(operationOkOrKo => { if (operationOkOrKo) { this.loadUsers() }
    })).subscribe()
  }
  
  loadUsers() {
    this.service.getUsersList$(this.pageIndex, this.pageSize, this.searchKeyword, this.selectedRole
   ).pipe(
      tap(data => {
        this.usersList = data.content;
        this.totalUsers = data.totalElements;
        console.log('Utenti presenti:', data.totalElements);
        console.log('Utenti caricati:', data.content);
      }),
      catchError(err => {
        const msg = err?.error?.message || err?.message || 'Errore sconosciuto';
        this.notify.error('Errore nel caricamento utenti: ' + this.notify.checkBackend(msg));
        return throwError(() => err);
      })
    ).subscribe();
}


  loadFilters(): void {
    this.service.getRoles$().pipe(
			tap(roles => {
			this.roles = roles;
			console.log('Ruoli caricati:', roles);
		}),
			catchError(err => {
        const msg = err?.error?.message || err?.message || 'Errore sconosciuto';
        this.notify.error('Errore nel caricamento ruoli: ' + this.notify.checkBackend(msg));
        return throwError(() => err);
		})
    ).subscribe();
  }
  
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadUsers();
  }

  private searchTimeout: any;
  searched: boolean = false;

  onFilterChange(value: string): void {
    clearTimeout(this.searchTimeout);
    this.searchTimeout= setTimeout(() => {
      this.pageIndex = 0;
      this.loadUsers();
      this.searched = true;
    }, 500);
  }
}