import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserChannelComponent} from './user-channel.component'

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'User-Channel',
      status: false
    },
    component: UserChannelComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserChannelRoutingModule { }
