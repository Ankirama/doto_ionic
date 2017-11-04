import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { OpenDotaProvider } from '../../providers/opendota/opendota';
import 'rxjs/add/observable/throw';

/**
 * Generated class for the ProfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export class ProfileInformations {
  profileName: string = "";
  profileAvatar: string = "";
  profileUrl: string = "";
  wins: number = 0;
  loses: number = 0;
  winrate: number = 0;
  mmr: number = 0;
  nmbrMatches: number = 0;
  avgWinrate: number = 0;
  avgKills: number = 0;
  avgDeaths: number = 0;
  avgAssists: number = 0;
  avgGPM: number = 0;
  avgXPM: number = 0;
  avgLH: number = 0;
}

@IonicPage()
@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {
  public profileInfo: ProfileInformations;
  private steamID32: string;
  private loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, 
    public api: OpenDotaProvider, public auth: AuthProvider) {
      this.reloadData();
  }

  reloadData() {
    this.profileInfo = new ProfileInformations();
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
              alert("Unable to find your dota account, you must add it first.");
              this.loading.dismiss();
            } else {
              this.loadSteamInfo()
              .then(() => {
                this.loadWinLossInfo()
                .then(() => {
                  this.loadRecentMatches()
                  .then(() => {
                    this.loading.dismiss();
                  })
                  .catch(error => {
                    this.loading.dismiss();
                  });
                })
                .catch(error => {
                  this.loading.dismiss();
                })
              })
              .catch(error => {
                this.loading.dismiss();
              });
            }
        } else {
          this.loading.dismiss();
        }
    })
    .catch(err => {
        this.loading.dismiss();
        console.log('debug error auth => ', err);
        alert("Unable to load your informations, please try again later..");
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
  }

  loadSteamInfo() {
    return new Promise((resolve, reject) => {
      return this.api.getDotaAccount(this.steamID32)
      .subscribe(data => {
        this.addProfileInfo(data);
        return resolve();
      }, error => {
        alert("Unable to load your profile, please try again later");
        return reject(error);
      });  
    });
  }

  loadWinLossInfo() {
    return new Promise((resolve, reject) => {
      return this.api.getWinsLosses(this.steamID32)
      .subscribe(data => {
        this.addWinLossInfo(data);
        return resolve();
      }, error => {
        alert("Unable to load your profile, please try again later");
        return reject(error);
      });
    });
  }

  loadRecentMatches() {
    return new Promise((resolve, reject) => {
      return this.api.getRecentMatches(this.steamID32)
      .subscribe(data => {
        this.addRecentMatchesInfo(data);
        return resolve();
      }, error => {
        alert("Unable to load your profile, please try again later");
        return reject(error);
      })  ;
    });
  }

  addRecentMatchesInfo(listMatches: any) {
    if (listMatches != null) {
      listMatches.forEach(element => {
        this.profileInfo.avgWinrate += 0;
        this.profileInfo.avgKills += element.kills;
        this.profileInfo.avgDeaths += element.deaths;
        this.profileInfo.avgAssists += element.assists;
        this.profileInfo.avgGPM += element.gold_per_min;
        this.profileInfo.avgXPM += element.xp_per_min;
        this.profileInfo.avgLH += element.last_hits;
      });
      this.profileInfo.nmbrMatches = listMatches.length;
      if (listMatches.length != 0) {
        this.profileInfo.avgKills = Math.floor(this.profileInfo.avgKills / listMatches.length)
        this.profileInfo.avgDeaths = Math.floor(this.profileInfo.avgDeaths / listMatches.length)
        this.profileInfo.avgAssists = Math.floor(this.profileInfo.avgAssists / listMatches.length)
        console.log(this.profileInfo.avgGPM);
        this.profileInfo.avgGPM = Math.floor(this.profileInfo.avgGPM / listMatches.length);
        this.profileInfo.avgXPM = Math.floor(this.profileInfo.avgXPM / listMatches.length)
        this.profileInfo.avgLH = Math.floor(this.profileInfo.avgLH / listMatches.length)
      }
    }
  }

  addWinLossInfo(winsLoses: any) {
    if (winsLoses != null) {
      this.profileInfo.wins = winsLoses.win;
      this.profileInfo.loses = winsLoses.lose;
      if (winsLoses.win && winsLoses.lose) {
        this.profileInfo.winrate = Math.round((winsLoses.win / (winsLoses.win + winsLoses.lose)) * 10000) / 100;
      }
    }
  }

  addProfileInfo(steamInfo: any) {
    if (steamInfo != null) {
      if (steamInfo.profile != null) {
        this.profileInfo.profileName = steamInfo.profile.personaname;
        this.profileInfo.profileAvatar = steamInfo.profile.avatarfull;
        this.profileInfo.profileUrl = steamInfo.profile.profileurl;
      }
      if (steamInfo.mmr_estimate != null) {
        this.profileInfo.mmr = steamInfo.mmr_estimate.estimate;
      }
    }
  }

  doRefresh(refresher) {
    this.reloadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }
}
