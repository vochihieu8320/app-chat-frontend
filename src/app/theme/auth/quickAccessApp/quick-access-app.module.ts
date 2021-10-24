import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickAccessAppRoutingModule } from './quick-access-app-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { QuickAccessAppComponent } from './quick-access-app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    QuickAccessAppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [QuickAccessAppComponent]
})
export class QuickAccessAppModule { }
