import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GetAccountComponent} from './get-account.component';

const routes: Routes = [
  {
    path: '',
    component: GetAccountComponent,
    data: {
      title: 'Get Quick Access',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GetAccountRoutingModule { }
