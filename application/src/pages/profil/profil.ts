import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, 
    public api: OpenDotaProvider, public auth: AuthProvider) {
    let loader = this.loadingCtrl.create({
      content: "Loading your profile ..."
    });
    loader.present();
    
    this.profileInfo = new ProfileInformations();
    this.loadSteamInfo();
    this.loadWinLossInfo();
    this.loadRecentMatches();

    loader.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
  }

  loadSteamInfo() {
    this.api.getDotaAccount(this.steamID32)
    .subscribe(data => {
      console.log("data steam info => ", data);
      this.addProfileInfo(data);
    }, error => {
      alert("Unable to load your profile, please try again later");
    })
  }

  loadWinLossInfo() {
    this.api.getWinsLosses(this.steamID32)
    .subscribe(data => {
      console.log("data win loss info => ", data);
      this.addWinLossInfo(data);
    }, error => {
      alert("Unable to load your profile, please try again later");
    })
  }

  loadRecentMatches() {
    this.api.getRecentMatches(this.steamID32)
    .subscribe(data => {
      console.log("data recent matches => ", data);
      this.addRecentMatchesInfo(data);
    }, error => {
      alert("Unable to load your profile, please try again later");
    })
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
}
