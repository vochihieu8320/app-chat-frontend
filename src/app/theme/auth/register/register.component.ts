import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { AuthenticationService } from './../../../services'
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: []
})
export class RegisterComponent implements OnInit {


  public registerForm: FormGroup;
  public loading = false;
  public submitted = false;
  public returnUrl: string;
  public error = '';
  public notification = '';
  public status = false;
  public linkreg = "";
  
  public matchValues(
    matchTo: string // name of the control to match to
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: false };
    };
  }

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService

  ) { }



  ngOnInit() {
    const currentUser = this.authenticationService.currentUserValue;
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    if (!!currentUser) {
      return this.router.navigate(["/"]);
    }

    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(8), Validators.maxLength(30)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }


  get f() { return this.registerForm.controls; };

  async onSubmit() {
    this.submitted = true;
    this.error = "";
    if (this.registerForm.invalid) {
      if(this.f.acceptTerms.errors) {
        this.error = "Accept Terms & Conditions must be required";
      }
      return
    };
    try {
      this.loading = true;
      const response =  <any> await this.authenticationService.register(this.f.name.value, this.f.email.value, this.f.password.value);
      if(response.error)
      {
        this.error = "Email or Name is already taken!";
        this.loading = false;
        return;
      }   
      else
      {
        // this.notification = 'Sign Up Success';
        Swal.fire('Sign up Success!', '', 'success');
        this.router.navigate([this.returnUrl]);
        this.loading = false;
      }
    } catch (error) {
      
    }
   
  }



  change(value){
    if(value && this.error ===  "Accept Terms & Conditions must be required"){
        this.error = "";
    }
  }

  redirect(){
   
    this.router.navigate([`auth/verify-email/${this.linkreg}`]);
  }
}
