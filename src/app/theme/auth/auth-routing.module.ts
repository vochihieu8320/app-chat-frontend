import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Authentication',
      status: false
    },
    children: [
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'register',
        loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
      },
      {
        path: 'forgot',
        loadChildren: () => import('./forgot/forgot.module').then(m => m.ForgotModule)
      },
      {
        path:'invite/:channelID',
        loadChildren: ()=> import('./accept-invite/accept-invite.module').then(m => m.AcceptInviteModule )
      },
     
      // {
      //   path: 'get-quick-access',
      //   loadChildren: () => import('./getAccount/get-account.module').then(m => m.GetAccountModule)
      // },
      // {
      //   path: 'verify-email/:id',
      //   loadChildren: () => import('./verifyEmail/verifyEmail.module').then(m => m.VerifyEmailModule)
      // },
      // {
      //   path: 'qa',
      //   loadChildren: () => import('./quickAccess/quick-access.module').then(m => m.QuickAccessModule)
      // },

      // {
      //   path : 'aqc',
      //   loadChildren: () => import('./quickAccessApp/quick-access-app.module').then(m => m.QuickAccessAppModule)
      // },
      // {
      //   path:'accept-invite/:id',
      //   loadChildren:() => import('./accept-invite-team/accept-invite-team.module').then(m=>m.AcceptInviteTeamModule)
      // },
      // {
      //   path:'create-campagin',
      //   loadChildren:() =>import('./create-campaign/create-campaign.module').then(m=>m.CreateCampaignModule)

      // },
      // {
      //   path:'unsubcribe',
      //   loadChildren:() => import('./unsub/unsub.module').then(m=>m.UnsubModule)
      // },
      {
        path: '',
        redirectTo : '/auth/login',
      },
     
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
