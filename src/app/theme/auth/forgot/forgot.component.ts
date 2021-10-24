import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ForgotService } from './../../../services'
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  public forgotForm: FormGroup;
  public loading = false;
  public submitted = false;
  public status = false;
  public error = '';
  public notification = '';
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private forgotService: ForgotService,
  ) { }

  ngOnInit() {
    // document.querySelector('body').setAttribute('themebg-pattern', 'theme1');

    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  };

  get f() { return this.forgotForm.controls; };


  onSubmit() {
    this.submitted = true;
    this.error = "";
    if (this.forgotForm.invalid) {
      this.error = "email is invalid!"
      return
    };
    this.loading = true;
    this.forgotService.forgotPassword(this.f.email.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data) {
            this.loading = false;
            this.status = data;
            this.notification = "We have sent a password to your email. Please check your email!"
          } else {
            this.loading = false;
            this.error = "Email does not exist!";
          }
        },
        error => {
          this.error = "Email does not exist!";
          this.loading = false;
        })
  }

}
