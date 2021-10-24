import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Error Pages',
      status: false
    },
    children: [
      {
        path: '400',
        loadChildren: () => import('./error-400/error-400.module').then(m => m.Error400Module)
      },
      {
        path: '403',
        loadChildren: () => import('./error-403/error-403.module').then(m => m.Error403Module)
      },
      {
        path: '404',
        loadChildren: () => import('./error-404/error-404.module').then(m => m.Error404Module)
      },
      {
        path: '500',
        loadChildren: () => import('./error-500/error-500.module').then(m => m.Error500Module)
      },
      {
        path: '503',
        loadChildren: () => import('./error-503/error-503.module').then(m => m.Error503Module)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule { }
