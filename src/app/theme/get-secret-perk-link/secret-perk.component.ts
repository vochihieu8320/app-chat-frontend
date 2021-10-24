import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SettingService } from '../../services'
import { first } from 'rxjs/operators';
@Component({
  selector: 'secret-perk-page',
  templateUrl: './secret-perk.component.html',
  styleUrls: ['./secret-perk.component.scss']
})
export class SecretPerkComponent implements OnInit {
  public getSecretPerkFrom: FormGroup;
  public loading = false;
  public submitted = false;
  public status = false;
  public error = '';
  public notification = '';
  public perkScrets = [];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private settingService: SettingService,
  ) { }

  ngOnInit() {
    document.body.setAttribute("style" , "background-color : #fff ");

    this.getSecretPerkFrom = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

  }


  get f() { return this.getSecretPerkFrom.controls; };


  async onSubmit() {
    this.submitted = true;
    this.error = "";
    if (this.getSecretPerkFrom.invalid) {
      this.error = "email is invalid!"
      return
    };
    try {
      this.loading = true;
      this.perkScrets = await this.settingService.fetchLinkPerkSecret(this.f.email.value);
      if (this.perkScrets && this.perkScrets.length > 0) {
        this.loading = false;
      } else {
        this.loading = false;
        this.error = "Email does not exist!";
      }
    } catch (error) {
      this.loading = false;
      this.error = "Email does not exist!";

    }


  }


}
