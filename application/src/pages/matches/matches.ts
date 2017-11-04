import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, InfiniteScroll } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { OpenDotaProvider, MatchData } from '../../providers/opendota/opendota';
import { SteamLoginPage } from '../steam-login/steam-login';
import { MatchPage } from '../../pages/match/match';

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
  loading;

  constructor(public navCtrl: NavController, private auth: AuthProvider, private api: OpenDotaProvider, private loadingCtrl: LoadingController) {
    this.reloadData();
  }

  getMatches(steamID32, offset = 0, limit = 10) {
    this.api.getMatches(steamID32, offset * limit, limit).subscribe(data => {
        data.forEach(match => {
          this.api.getHeroData(match["hero_id"])
            .then(hero => {
              let minutes = Math.floor(parseInt(match["duration"]) / 60);
              let seconds = parseInt(match["duration"]) % 60;
              let tmp: MatchData = {
                hero: hero,
                kills: match["kills"],
                assists: match["assists"],
                deaths: match["deaths"],
                matchID: match["match_id"],
                date: (new Date(parseInt(match["start_time"]) * 1000)).toDateString(),
                duration: minutes + ":" + (seconds < 10 ? "0" + seconds : seconds)
              };
              this.matches.push(tmp);
            })
            .catch(error => {
              this.matches.push({error: true});
              console.log('error during hero find => ', error);
            });
        });
        this.loading.dismiss();
    }, error => {
      this.loading.dismiss();
      this.gotError = true;
      console.log('debug error getMatches => ', error);
      alert(error);
    });
  }

  doRefresh(refresher) {
    this.reloadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  reloadData() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      duration: 5000
    });
    this.loading.present();
    this.gotError = false;
    this.auth.getCurrentUser()
    .then(data => {
        if (data !== null) {
            this.email = data.email;
            this.steamID32 = data.steamID32 != undefined ? data.steamID32 : null;
            this.getMatches(this.steamID32, 0, (this.offset + 1) * this.limit);
        } else {
          this.loading.dismiss();
        }
    })
    .catch(err => {
      this.loading.dismiss();
        console.log('debug error matches => ', err);
    });
  }

  loadMoreData(infiniteScroll: InfiniteScroll) {
    this.offset += 1;
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      duration: 5000
    });
    this.loading.present();
    this.getMatches(this.steamID32, this.offset, this.limit);
    infiniteScroll.complete();
  }

  itemTapped(event, item) {
    this.navCtrl.push(MatchPage, {
      item: item
    })
  }

  dotaAccount() {
    this.navCtrl.setRoot(SteamLoginPage);
  }

  ionViewDidLoad() {
  }
}
