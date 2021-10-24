import {NgModule} from '@angular/core';
import {Routes , RouterModule} from '@angular/router';
import {AcceptInviteComponent} from './accept-invite.component';

const routes:Routes = [
    {
        path: '',
        component: AcceptInviteComponent,
        data: {
            title: 'Accept Member',
            icon: 'icon-layout-sidebar-left',
            caption: '',
            status: true
        }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class AcceptInviteRoutingModule{}