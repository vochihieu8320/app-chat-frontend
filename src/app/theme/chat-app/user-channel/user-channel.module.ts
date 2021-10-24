import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserChannelComponent } from './user-channel.component';
import { UserChannelRoutingModule} from './user-channel.routing.module'
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { ClipboardModule } from 'ngx-clipboard';
import {NouisliderModule} from 'ng2-nouislider';

@NgModule({
  declarations: [UserChannelComponent],
  imports: [
    CommonModule,
    UserChannelRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    ClipboardModule,
    NouisliderModule
  ]
})
export class UserChannelModule { }
