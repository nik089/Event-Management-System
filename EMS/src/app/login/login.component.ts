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
  loginUser: any = [];
  isPasswordVisible: boolean = false;


  constructor(
    private fb: FormBuilder,
    private emsService: EmsService,
    private toastr: ToastrManager,
    private router: Router

  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  //function are used to change login and signUp tab
  toggleForm(type: string) {
    if (type === 'signup') {
      this.formMargin = '-50%';
      this.loginTextMargin = '-50%';
      this.sliderTabPosition = '50%';
    } else {
      this.formMargin = '0%';
      this.loginTextMargin = '0%';
      this.sliderTabPosition = '0%';
    }
  }


  //function are used to show and hide password
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  //login submit
  onSubmit() {
    const formValues = this.loginForm.value;
    this.emsService.login().subscribe({
      next: (res: any) => {
        this.loginUser = res;
        const user = this.loginUser.find((u: any) => u.email === formValues.email && u.password === formValues.password);
        if (user) {
          this.loginError = '';
          this.toastr.successToastr('Login Successful!');
          localStorage.setItem("isloggedInBranchX", "1");
          this.router.navigate(['dashboard'])
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







