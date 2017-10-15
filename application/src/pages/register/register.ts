import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';

import { PasswordValidator } from '../../validators/password';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  authForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.navCtrl = navCtrl;

    this.authForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,24})$')])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      password_check: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    }, {'validator': PasswordValidator.isMatching});
  }

  onSubmit(value: any): void {
    if(this.authForm.valid) {
      window.localStorage.setItem('email', value.email.toLowerCase());
      window.localStorage.setItem('password', value.password);
      location.reload();
    }
  }

  ionViewDidEnter() {
    console.log('reset form');
    this.authForm.reset();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}