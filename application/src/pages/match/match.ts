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
  playerVictory: any;
  radiantScore: number = 0;
  direScore: number = 0;


  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthProvider, private api: OpenDotaProvider) {
    console.log("recapMatch => ", navParams);
    this.recapMatch = navParams.get('item');
    console.log("recapMatch => ", this.recapMatch);
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
              console.log("Debug radiant score :", this.radiantScore);
              console.log("Debug radiant score :", element.kills);
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
            console.log('error during hero find => ', error);
            element.isRadiant ? this.radiantPlayers.push(element) : this.direPlayers.push(element);  
          });     
        }
      });
    }
  }

  getMatch(idMatch) {
    this.api.getMatchById(idMatch).subscribe(data => {
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
