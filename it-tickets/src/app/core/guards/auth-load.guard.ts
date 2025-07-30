// core/guards/auth-load.guard.ts
// import { Injectable } from '@angular/core';
// import { CanLoad, Route, Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';

// @Injectable({ providedIn: 'root' })
// export class AuthLoadGuard implements CanLoad {
//   constructor(private auth: AuthService, private router: Router) {}

//   canLoad(route: Route): boolean {
//     const isLogged = this.auth.isLoggedIn;
//     if (!isLogged) {
//       this.router.navigate(['/login']);
//       return false;
//     }
//     return true;
//   }
// }
