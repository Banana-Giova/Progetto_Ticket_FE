import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Layout } from './core/layout/layout';

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
  { path: '**', redirectTo: '' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
