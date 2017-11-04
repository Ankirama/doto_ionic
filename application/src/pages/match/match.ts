import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
  
  steamID32: string;

  recapMatch: any;
  gotError = false;
  radiantPlayers: any;
  direPlayers: any;
  hero: any;
  playerVictory: any;
  radiantScore: number = 0;
  direScore: number = 0;

  private loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthProvider,public loadingCtrl: LoadingController, private api: OpenDotaProvider) {
    this.recapMatch = navParams.get('item');
    this.reloadData(this.recapMatch.matchID);
  }

  getPlayersFromJson(match) {
    if (match != null && 'players' in match) {
      this.radiantPlayers = [];
      this.direPlayers = [];
      match.players.forEach(element => {
        if ('isRadiant' in element) {
          this.api.getHeroData(element.hero_id)
          .then(hero => {
            element.avatar = hero.avatar;
            if (element.isRadiant) {
              this.radiantPlayers.push(element);
              this.direScore += element.deaths;
              if (element.account_id == this.steamID32 && match.radiant_win) {
                this.playerVictory = true;
              }
            } else {
              this.direPlayers.push(element)
              this.radiantScore += element.deaths;
              if (element.account_id == this.steamID32 && !match.radiant_win) {
                this.playerVictory = true;
              }
            } 
          })
          .catch(error => {
            element.avatar = null;
            element.isRadiant ? this.radiantPlayers.push(element) : this.direPlayers.push(element);  
          });     
        }
      });
    }
  }

  getMatch(idMatch) {
    return new Promise((resolve, reject) => {
      return this.api.getMatchById(idMatch)
      .subscribe(data => {
        this.getPlayersFromJson(data);
        return resolve();
      }, error => {
        alert("Unable to load your match, please try again later");
        return reject(error);
      });
    });
  }

  reloadData(idMatch) {
    this.gotError = false;
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      duration: 5000
    });
    this.loading.present();
    this.auth.getCurrentUser()
    .then(data => {
        if (data !== null) {
            this.steamID32 = data.steamID32 != undefined ? data.steamID32 : null;
            if (this.steamID32 == null) {
              alert("Unable to find your dota account, you must add it first");
              this.loading.dismiss();
            } else {
              this.getMatch(this.recapMatch.matchID)
              .then(() => {

              })
              .catch(error => {
                this.loading.dismiss();
              })
            }
        } else {
          this.loading.dismiss();
        }
    })
    .catch(err => {
      this.loading.dismiss();
        console.log('debug error matches => ', err);
        alert("Unable to load your match, please try again later..");
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MatchPage');
  }

}
