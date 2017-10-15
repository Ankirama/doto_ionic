import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  email: string;
  constructor(public navCtrl: NavController, private auth: AuthProvider) {
    auth.getCurrentUser()
      .then(data => {
        if (data !== null) {
          this.email = data.email;
        }
      })
      .catch(err => {
        console.log('debug error => ', err);
      });
  }

  logout(): void {
    this.auth.logout();
    location.reload();
  }
}
