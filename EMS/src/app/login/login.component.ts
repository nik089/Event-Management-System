import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formMargin: string = '0%';
  loginTextMargin: string = '0%';
  sliderTabPosition: string = '0%';

  constructor() { }


  ngOnInit(): void {

  }

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

  isPasswordVisible: boolean = false;

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}

