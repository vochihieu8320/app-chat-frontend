import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Charts',
      status: false
    },
    children: [
      {
        path: 'google',
        loadChildren: () => import('./google-chart/google-chart.module').then(m => m.GoogleChartModule)
      },
      {
        path: 'chart-js',
        loadChildren: () => import('./chart-js/chart-js.module').then(m => m.ChartJsModule)
      },
      {
        path: 'radial',
        loadChildren: () => import('./radial/radial.module').then(m => m.RadialModule)
      },
      {
        path: 'c3-js',
        loadChildren: () => import('./c3-js/c3-js.module').then(m => m.C3JsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartRoutingModule { }
