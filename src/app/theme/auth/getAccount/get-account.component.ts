import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ForgotService, GetAccountService } from '../../../services'
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-get-account',
  templateUrl: './get-account.component.html',
  styleUrls: ['./get-account.component.scss']
})
export class GetAccountComponent implements OnInit {

  public getAccountForm: FormGroup;
  public loading = false;
  public submitted = false;
  public status = false;
  public error = '';
  public notification = '';
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private getAccountService: GetAccountService,
  ) { }

  ngOnInit() {
    // document.querySelector('body').setAttribute('themebg-pattern', 'theme1');

    this.getAccountForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  };

  get f() { return this.getAccountForm.controls; };


  async onSubmit() {
    this.submitted = true;
    this.error = "";
    if (this.getAccountForm.invalid) {
      this.error = "email is invalid!"
      return
    };
    this.loading = true;
    const data = await this.getAccountService.getAccount(this.f.email.value)
    if (data) {
      this.loading = false;
      this.status = data.status;
      if (this.status) {
        this.notification = "We have sent a quick access URL to your email. Please check your email!";
      } else {
        // if(data.code === "USER_EXIST") {
        //   this.error = "Email has been registered for another account!";
        // }
        if (data.code === "EMAIL_NOT_EXIST") {
          this.error = "Email does not exist!";
        }
      }
    } else {
      this.loading = false;
      this.error = "Email does not exist!";
    }

  }

}
