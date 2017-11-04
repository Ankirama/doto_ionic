import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OpenDotaProvider } from '../../providers/opendota/opendota';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the MatchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-match',
  templateUrl: 'match.html',
})
export class MatchPage {
  
  email: string;
  steamID32: string;

  recapMatch: any;
  gotError = false;
  radiantPlayers: any;
  direPlayers: any;
  hero: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthProvider, private api: OpenDotaProvider) {
    this.recapMatch = navParams.get('item');
    console.log("recapMatch => ", this.recapMatch);
    this.reloadData(this.recapMatch.match_id);
  }

  getPlayersFromJson(match) {
    if (match != null && 'players' in match) {
      this.radiantPlayers = [];
      this.direPlayers = [];
      match.players.forEach(element => {
        if ('isRadiant' in element) {
          element.isRadiant ? this.radiantPlayers.push(element) : this.direPlayers.push(element);
          /*this.hero = this.api.getHeroData(element.hero_id);
          if (this.hero != null) {
            element.avatar = this.hero.avatar;
            console.log(element.avatar);
          }*/
        }
      });
    }
    console.log("radiant Players => ", this.radiantPlayers);
    console.log("dire Players => ", this.direPlayers);
  }

  getMatch(idMatch) {
    this.api.getMatchById(idMatch).subscribe(data => {
      console.log('debug data => ', data);
      this.getPlayersFromJson(data);
    }, error => {
      this.gotError = true;
      console.log('debug error getMatches => ', error);
      alert('Unable to plouf');
      // make alert
    })


  }

  reloadData(idMatch) {
    this.gotError = false;
    this.auth.getCurrentUser()
    .then(data => {
        if (data !== null) {
            this.email = data.email;
            this.steamID32 = data.steamID32 != undefined ? data.steamID32 : null;
            this.getMatch(idMatch);
        }
    })
    .catch(err => {
        console.log('debug error matches => ', err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MatchPage');
  }

}
