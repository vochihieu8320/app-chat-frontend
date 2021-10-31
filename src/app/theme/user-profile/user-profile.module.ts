import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import {UserProfileRoutingModule} from './user-profile-routing.module'
import {SharedModule} from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';



@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule
  ]
})
export class UserProfileModule { }
