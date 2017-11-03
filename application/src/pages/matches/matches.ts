import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { OpenDotaProvider } from '../../providers/opendota/opendota';
import 'rxjs/add/observable/throw';

/**
 * Generated class for the MatchesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-matches',
  templateUrl: 'matches.html',
})
export class MatchesPage {

  email: string;
  steamID32: string;
  matches = [];
  gotError = false;
  offset = 0;
  limit = 10;

  constructor(public navCtrl: NavController, private auth: AuthProvider, private api: OpenDotaProvider) {
    this.reloadData();
  }

  getMatches(steamID32, offset = 0, limit = 10) {
    this.api.getMatches(steamID32, offset, limit).subscribe(data => {
        console.log('debug data ==> ', data);
        this.matches = this.matches.concat(data);
    }, error => {
      this.gotError = true;
      console.log('debug error getMatches => ', error);
      alert('Unable to plouf');
//      alert(error);
    });
  }

  reloadData() {
    this.gotError = false;
    this.auth.getCurrentUser()
    .then(data => {
        if (data !== null) {
            this.email = data.email;
            this.steamID32 = data.steamID32 != undefined ? data.steamID32 : null;
            this.getMatches(this.steamID32, 0, this.limit);
        }
    })
    .catch(err => {
        console.log('debug error matches => ', err);
    });
  }

  loadMoreData() {
    this.offset += 1;
    this.getMatches(this.steamID32, this.offset, this.limit);
  }

  dotaAccount() {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MatchesPage');
  }
}
