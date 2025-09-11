import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Layout } from './core/layout/layout';
import { InvalidGuard } from './core/guards/invalid.guard';

const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
        {
          path: '',
          loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
        }
    ]
  },
  {
    path: '**',
    canActivate: [InvalidGuard],
    children: []
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
