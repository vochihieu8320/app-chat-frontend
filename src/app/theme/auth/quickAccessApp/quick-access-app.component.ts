import { Component, OnInit } from '@angular/core';
import { animate, AUTO_STYLE, state, style, transition, trigger } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../../services';

const pageDefults = [
  {
    name: 'conversations_creation',
    url: '/anybackup-app-conversations/new-message',
  },
  {
    name: 'conversations_list',
    url: '/anybackup-app-conversations/inbox',
  }
]


@Component({
  selector: 'app-quick-access-app',
  templateUrl: './quick-access-app.component.html',
  styleUrls: ['./quick-access-app.component.scss'],
  animations: []
})
export class QuickAccessAppComponent implements OnInit {
  protected token: string;
  protected url: string;
  public tokenInvalid: boolean;
  public loading: boolean;
  public notification: string;
  public styleNoti: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    const nameUrl = this.route.snapshot.queryParams['p'];
    this.url = pageDefults.find(pageDefult => pageDefult.name === nameUrl)?.url;
    this.loading = true;
    this.notification = "The request is being processed…";
    this.styleNoti = "text-primary";
    this.tokenInvalid = false;
    this.token = this.route.snapshot.queryParams['t'];
    if (!this.token && !this.url) {
      this.tokenInvalid = true;
      this.loading = false;
      this.notification = "The request is invalid !";
      this.styleNoti = "text-danger";
    }
  }

  async ngOnInit() {
    if (this.url && !this.tokenInvalid) {
      try {
        const { status } = await this.authenticationService.checkTokenAppQuickAccess(this.token);
        if (status) {
          this.authenticationService.setLocalUserProfile(this.token);
          setTimeout(() => {
            this.router.navigate([this.url]);
          }, 100);
        } else {
          this.tokenInvalid = true;
          this.loading = false;
          this.notification = "The request is invalid !";
          this.styleNoti = "text-danger";
        }
      } catch (error) {
        this.tokenInvalid = true;
        this.loading = false;
        this.notification = "The request is invalid !";
        this.styleNoti = "text-danger"
      }
    }
  }

}
