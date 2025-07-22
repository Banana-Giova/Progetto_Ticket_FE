import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';

const routes: Routes = [
  {
    path: 'home',
    component: Home
  },
  {
    path: 'login',
    loadChildren:  () => import('./login/login.module').then(m => m.LoginModule)
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
