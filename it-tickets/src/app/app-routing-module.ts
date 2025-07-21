import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Layout } from './core/layout/layout';
import { Home } from './features/home/home';

const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
    { path: '',       component: Home },
    ]
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
