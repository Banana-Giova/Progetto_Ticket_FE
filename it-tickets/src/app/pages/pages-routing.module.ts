import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { Register } from './register/register';

const routes: Routes = [
  {
    path: 'home',
    component: Home
  },
  {
    path: 'register',
    component: Register
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
