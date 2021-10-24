import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcceptInviteComponent } from './accept-invite.component';
import {AcceptInviteRoutingModule} from './accept-invite.routing.module'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../../shared/shared.module';
@NgModule({
  declarations: [AcceptInviteComponent],
  imports: [
    CommonModule,
    AcceptInviteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AcceptInviteModule { }
