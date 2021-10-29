import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {transition, trigger, style, animate} from '@angular/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { io } from "socket.io-client";
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({opacity: 0}),
        animate('400ms ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translate(0)'}),
        animate('400ms ease-in-out', style({opacity: 0}))
      ])
    ])
  ]
})
export class VideoComponent implements OnInit {

  channelID : string;
  socket : any;
  user_id: any;
  myPeer: any;
  constructor( private router: Router,  
    private route: ActivatedRoute ,) {
      const local = localStorage.getItem("currentUser");
      const userInfo = JSON.parse(local);
      this.user_id = userInfo["id"];
      this.channelID = this.route.snapshot.paramMap.get("channelID");   

   }

  ngOnInit() {
    this.socket = io(environment.apiUrl);
    
  }

  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }


}
