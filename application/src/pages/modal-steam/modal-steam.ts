//import { ViewController } from 'ionic-angular/es2015';
import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { SteamUser } from '../steam-login/steam-login';

/**
 * Generated class for the ModalSteamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-steam',
  templateUrl: 'modal-steam.html',
})
export class ModalSteamPage {

  steamUser: SteamUser = null;
  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.steamUser = this.navParams.get('user');

  }

  dismiss() {
    this.viewCtrl.dismiss(false);
  }

  validate() {
    this.viewCtrl.dismiss(true);
  }

  ionViewDidLoad() {
  }

}
