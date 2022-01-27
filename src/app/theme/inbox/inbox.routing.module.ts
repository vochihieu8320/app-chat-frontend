import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InboxComponent} from './inbox.component'

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Inboxs',
      status: false
    },
    component: InboxComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule { }
