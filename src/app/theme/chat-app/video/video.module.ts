import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoComponent } from './video.component';
import {VideoRoutingModule} from './video-routing.module'
import {SharedModule} from '../../../shared/shared.module';



@NgModule({
  declarations: [VideoComponent],
  imports: [
    CommonModule,
    VideoRoutingModule,
    SharedModule
  ]
})
export class VideoModule { }
