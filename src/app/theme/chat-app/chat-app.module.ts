import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChatAppRoutingModule} from './chat-app.routing.module'
import {SharedModule} from '../../shared/shared.module';
 
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ChatAppRoutingModule,
    SharedModule
  ]
})
export class ChatAppModule { }
