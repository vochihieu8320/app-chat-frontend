import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './layout/admin/admin.component';
import { AuthComponent } from './layout/auth/auth.component';
import { ConversationComponent } from './layout/conversations/conversation.component';
import { ErrorComponent } from './layout/error/error.component'
import { AuthGuard, PaymentGuard, ConversationGuard } from './helper';
import {OderQuickCheckComponent} from './theme/oder-quick-check/oder-quick-check.component';
import { SecretPerkComponent } from './theme/get-secret-perk-link/secret-perk.component'

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'chat-app',
        pathMatch: 'full'
      },
      // { 
      //   path: 'home',
      //   loadChildren : () => import('./theme/home/home.module').then(m => m.HomeModule)
      // },
      
      {
        path: 'chat-app',
        loadChildren: () => import('./theme/chat-app/chat-app.module').then(m => m.ChatAppModule)
      },
      {
        path: 'user-profile/:userID',
        loadChildren: ()=>import('./theme/user-profile/user-profile.module').then(m=> m.UserProfileModule)
      }
     
    
     
     
   
     
      
      /*{
        path: 'dashboard',
        loadChildren: () => import('./theme/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'navigation',
        loadChildren: () => import('./theme/navigation/navigation.module').then(m => m.NavigationModule)
      },
      {
        path: 'widget',
        loadChildren: () => import('./theme/widget/widget.module').then(m => m.WidgetModule)
      },
      {
        path: 'basic',
        loadChildren: () => import('./theme/ui-elements/basic/basic.module').then(m => m.BasicModule)
      },
      {
        path: 'advance',
        loadChildren: () => import('./theme/ui-elements/advance/advance.module').then(m => m.AdvanceModule)
      },
      {
        path: 'animations',
        loadChildren: () => import('./theme/ui-elements/animation/animation.module').then(m => m.AnimationModule)
      },
      {
        path: 'forms',
        loadChildren: () => import('./theme/forms/forms.module').then(m => m.FormsModule)
      },
      {
        path: 'bootstrap-table',
        loadChildren: () => import('./theme/table/bootstrap-table/bootstrap-table.module').then(m => m.BootstrapTableModule)
      },
      {
        path: 'data-table',
        loadChildren: () => import('./theme/table/tbl-datatable/tbl-datatable.module').then(m => m.TblDatatableModule)
      },

      {
        path: 'email',
        loadChildren: () => import('./theme/email/email.module').then(m => m.EmailModule)
      },
      {
        path: 'crm-contact',
        loadChildren: () => import('./theme/crm-contact/crm-contact.module').then(m => m.CrmContactModule)
      },
      {
        path: 'task',
        loadChildren: () => import('./theme/task/task.module').then(m => m.TaskModule)
      },
      {
        path: 'editor',
        loadChildren: () => import('./theme/extension/editor/editor.module').then(m => m.EditorModule)
      },
      {
        path: 'invoice',
        loadChildren: () => import('./theme/extension/invoice/invoice.module').then(m => m.InvoiceModule)
      },
      {
        path: 'file-upload-ui',
        loadChildren: () => import('./theme/extension/file-upload-ui/file-upload-ui.module').then(m => m.FileUploadUiModule)
      },
      {
        path: 'full-event-calendar',
        loadChildren: () => import('./theme/extension/full-event-calendar/full-event-calendar.module').then(m => m.FullEventCalendarModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./theme/chart/chart.module').then(m => m.ChartModule)
      },
      {
        path: 'map',
        loadChildren: () => import('./theme/map/map.module').then(m => m.MapModule)
      },
      {
        path: 'simple-page',
        loadChildren: () => import('./theme/simple-page/simple-page.module').then(m => m.SimplePageModule)
      }
      */
    ]
  },
  

  {
    path:'order-quick-check',
    component: OderQuickCheckComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./theme/oder-quick-check/oder-quick-check.module').then(m => m.OderQuickCheckModule)
      }
    ]

  },


  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./theme/auth/auth.module').then(m => m.AuthModule)
      },
    ]
  },
 

  {
    path:'secret-perks',
    // component: SecretPerkComponent,
    // data : {
    //   title: 'Get Secret Perk',
    // },
    children: [
      {
        path: '',
        loadChildren: () => import('./theme/get-secret-perk-link/secret-perk.module').then(m => m.SecretPerkModule)
      }
    ]

  },

  // {
  //   path: '',
  //   component: ErrorComponent,
  //   children: [
  //     {
  //       path: 'error',
  //       loadChildren: () => import('./theme/maintenance/error/error.module').then(m => m.ErrorModule)
  //     }
  //   ]
  // },

  // { path: '**', redirectTo: '/error/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
