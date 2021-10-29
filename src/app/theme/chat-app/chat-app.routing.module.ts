import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Chanel',
      status: false
    },
    children: [
      {
        path: '',
        loadChildren: ()=>import('./chanel/chanel.module').then( m => m.ChanelModule)
      },
      {
        path:'user-channel/:userID',
        loadChildren: ()=> import('./user-channel/user-channel.module').then(m=> m.UserChannelModule)
      },
      {
        path:'video/:channelID',
        loadChildren: ()=> import('./video/video.module').then(m => m.VideoModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatAppRoutingModule { }
