import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AppChatService} from '../../../services/app-chat/app-chat.service';
@Component({
  selector: 'app-accept-invite',
  templateUrl: './accept-invite.component.html',
  styleUrls: ['./accept-invite.component.scss']
})
export class AcceptInviteComponent implements OnInit {

  public loginForm: FormGroup;
  public loading = false;
  public submitted = false;
  public user_channel : string;
  public error = '';
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: AppChatService
  ) {
    this.user_channel = this.route.snapshot.paramMap.get("channelID");   
   }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
     
    });
  }

  get f() { return this.loginForm.controls; };
  async onSubmit()
  {
    this.submitted = true;
    this.error = "";
    if (this.loginForm.invalid) {
      return
    };
    try {
      const body = {
        email: this.f.email.value,
        channelID: this.user_channel
      }
      const respone = <any> await this.service.joinchanel(body);
      const returnUrl = `auth/invite/${this.user_channel}`;
      if(respone.data)
      {
        this.router.navigate(['/auth/register'], {queryParams: {returnUrl: returnUrl }})
      }
      else
      {
        this.router.navigate([`/chat-app/user-channel/${respone.channelUser.userID}`])
      }
    } catch (error) {
      
    }
  }
}
