import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChanelComponent } from './chanel.component';
import {ChanelRoutingModule} from './chanel.routing.module'
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [ChanelComponent],
  imports: [
    CommonModule,
    ChanelRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ChanelModule { }
