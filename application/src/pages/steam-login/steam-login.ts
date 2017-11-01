import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Http } from '@angular/http';
import { BigNumber } from 'bignumber.js'

/**
 * Generated class for the SteamLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-steam-login',
  templateUrl: 'steam-login.html',
})
export class SteamLoginPage {

  steamForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, private http: Http) {
    this.navCtrl = navCtrl;
    this.steamForm = formBuilder.group({
      username: [''],
    });
  }

  onSubmit(value: any): void {
    if(this.steamForm.valid) {
      this.http.get("/steamapi/?key=459CB95F42E003F566ED61C775D0C2CF&vanityurl=" + value.username)
        .subscribe(data => {
          console.log('data => ', data.json());
          console.log('debug ==> ', data.json()["response"]);
          let steamid = data.json()["response"]["steamid"]
          let steamid32 = new BigNumber(steamid).minus("76561197960265728").toString();
          console.log("steamid32 => ", steamid32);
        }, error => {
          console.log('error => ', error);
        });
    }
  }

  ionViewDidEnter() {
    console.log('reset form');
    this.steamForm.reset();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SteamLoginPage');
  }
}
