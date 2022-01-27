import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InboxComponent } from './inbox.component';
import {InboxRoutingModule} from './inbox.routing.module'
import {SharedModule} from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [InboxComponent],
  imports: [
    CommonModule,
    InboxRoutingModule,
    SharedModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class InboxModule { }
