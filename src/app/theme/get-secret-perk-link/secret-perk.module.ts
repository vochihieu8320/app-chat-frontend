import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecretPerkComponent } from './secret-perk.component';
import { SecretPerkRoutingModule } from './secret-perk-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SecretPerkRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [SecretPerkComponent]
})
export class SecretPerkModule { }
