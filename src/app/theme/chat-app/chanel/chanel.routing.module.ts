import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChanelComponent} from './chanel.component'

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Channel',
      status: false
    },
    component: ChanelComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChanelRoutingModule { }
