import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuickAccessAppComponent } from './quick-access-app.component';

const routes: Routes = [
  {
    path: '',
    component: QuickAccessAppComponent,
    data: {
      title: 'Quick Access For App',
      status: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuickAccessAppRoutingModule { }
