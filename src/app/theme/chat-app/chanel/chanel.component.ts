import { Component, OnInit } from '@angular/core';
import {transition, trigger, style, animate} from '@angular/animations';
import {AppChatService} from '../../../services/app-chat/app-chat.service';
import { Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-chanel',
  templateUrl: './chanel.component.html',
  styleUrls: ['./chanel.component.scss'],
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
export class ChanelComponent implements OnInit {
  formInput: any;
  isSubmit: boolean;
  user_id: string;
  loading: boolean;
  user_email: string;
  constructor(private service: AppChatService,  private router: Router, private route: ActivatedRoute) { 
   
    const local = localStorage.getItem("currentUser");
    const user_info =JSON.parse(local);
    this.user_id= user_info["id"];
    this.user_email = user_info["email"]
    
    this.isSubmit = false;
    this.formInput = {
      name: ""
    };
    this.loading = false;
  }

  async ngOnInit() {
    const check_channel =<any> await this.service.checkChannel(this.user_id);
    if(check_channel.data)
    {
      this.router.navigate([`chat-app/user-channel/${this.user_id}`])
    }
  }

  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }



  async save(event)
  {
    if(!this.formInput.name)
    {
      return;
    }
  
   try {
     this.loading = true
     const body = {
       ...this.formInput,
       owner: this.user_id
     }
    const new_channel = <any>  await this.service.CreateChannel(body);
   
    const join_channel = {
      email: this.user_email,
      channelID: new_channel.data._id
    }
    
    await this.service.joinchanel(join_channel)
     this.loading = false;
     this.router.navigate([`chat-app/user-channel/${this.user_id}`])
   } catch (error) {
     this.loading = false
   } 
  }
}
