import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetAccountComponent } from './get-account.component';
import {GetAccountRoutingModule} from './get-account-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    GetAccountRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [GetAccountComponent]
})
export class GetAccountModule { }
