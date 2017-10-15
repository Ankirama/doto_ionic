import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  authForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public auth: AuthProvider) {
    this.navCtrl = navCtrl;
    this.authForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,24})$')])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  onSubmit(value: any): void {
    if(this.authForm.valid) {
      let credentials = {
        email: value.email.toLowerCase(),
        password: value.password
      };
      this.auth.loginWithEmail(credentials)
        .then(data => {
          console.log('data ==> ', data);
          location.reload();
        })
        .catch(error => {
          if (error.code === "auth/invalid-email" || error.code === "auth/wrong-password") {
            alert("Your combination email / password is not good.");
          } else {
            alert(error.message);
          }
        });
    }
  }

  ionViewDidEnter() {
    console.log('reset form');
    this.authForm.reset();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
