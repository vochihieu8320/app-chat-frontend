import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OderQuickCheckComponent } from './oder-quick-check.component';
import {OderQuickCheckRoutingModule } from './oder-quick-check-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SharedModule} from './../../shared/shared.module';

@NgModule({
  declarations: [OderQuickCheckComponent],
  imports: [
    CommonModule,
    OderQuickCheckRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
    
  ]
})
export class OderQuickCheckModule { }
