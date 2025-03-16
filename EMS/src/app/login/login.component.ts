import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmsService } from '../service/ems.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formMargin: string = '0%';
  loginTextMargin: string = '0%';
  sliderTabPosition: string = '0%';
  loginError: string = '';
  loginForm: FormGroup;
  signUpForm: FormGroup;
  loginUser: any = [];
  isPasswordVisible: boolean = false;
  isPasswordVisible1: boolean = false;
  isPasswordVisible2: boolean = false;

  isSubmitted: boolean = false;
  isLoginSubmitted: boolean = false;



  constructor(
    private fb: FormBuilder,
    private emsService: EmsService,
    private toastr: ToastrManager,
    private router: Router

  ) {

    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });


    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }


  ngOnInit(): void {

  }

  //function are used to change login and signUp tab
  toggleForm(type: string) {
    if (type === 'signup') {
      this.formMargin = '-50%';
      this.loginTextMargin = '-50%';
      this.sliderTabPosition = '50%';
      this.isSubmitted = false;
      this.loginForm.reset();
    } else {
      this.formMargin = '0%';
      this.loginTextMargin = '0%';
      this.sliderTabPosition = '0%';
      this.isLoginSubmitted = false;
      this.signUpForm.reset();

    }
  }


  //function are used to show and hide password
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  togglePasswordVisibility1() {
    this.isPasswordVisible1 = !this.isPasswordVisible1;
  }

  togglePasswordVisibility2() {
    this.isPasswordVisible2 = !this.isPasswordVisible2;
  }

  //login submit
  onSubmit() {
    this.isLoginSubmitted = true;
    if (this.loginForm.valid) {
      const formValues = this.loginForm.value;
      console.log(formValues, "formValues")
      this.emsService.loginAndNewUser().subscribe({
        next: (res: any) => {
          this.loginUser = res;
          const user = this.loginUser.find((u: any) => u.email === formValues.email && u.password === formValues.password);
          if (user) {
            this.loginError = '';
            this.toastr.successToastr('Login Successful!');
            localStorage.setItem("isloggedInEMS", "1");
            this.router.navigate(['/dashboard']);
            this.isLoginSubmitted = false;

          } else {
            this.toastr.errorToastr('Invalid email or password!');
          }
        },
        error: (error) => {
          this.toastr.errorToastr('Error occurred while logging in!');
          console.error(error);
        }
      });
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  signUp(): void {
    this.isSubmitted = true;
    if (this.signUpForm.valid) {
      const formData = this.signUpForm.value;
      this.emsService.addNewUser(formData).subscribe({
        next: (response) => {
          this.toastr.successToastr('Signup successful!');
          this.signUpForm.reset();
          this.isSubmitted = false;
        },
        error: (error) => {
          this.toastr.errorToastr('Signup failed!');
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}