import { Component } from '@angular/core';

import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';

@Component({
  templateUrl: 'auth.html'
})
export class AuthPage {

  tab1Root = LoginPage;
  tab2Root = RegisterPage;

  constructor() {

  }
}
