import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {ProfileProvider} from '../../providers/profile/profile'
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
  wins: string = "";
  losses: string = "";
  winrate: string = "";
  mmr: string = "";
  avgWinrate: any = 0;
  avgKills: any = 0;
  avgDeaths: any = 0;
  avgAssists: any = 0;
  avgGPM: any = 0;
  avgXPM: any = 0;
  avgLH: any = 0;
}

@IonicPage()
@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
  providers: [ProfileProvider]
})
export class ProfilPage {
  profileInfo: ProfileInformations;

  constructor(public navCtrl: NavController, public navParams: NavParams, public profile: ProfileProvider) {
    this.profileInfo = new ProfileInformations();
    this.loadSteamInfo();
    this.loadRecentMatches();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
  }

  loadSteamInfo() {
    this.profile.getDotaAccount()
    .then(data => {
      console.log("data steam info => ", data);
      this.addProfileInfo(data);
    })
  }

  loadRecentMatches() {
    this.profile.getRecentMatches()
    .then(data => {
      console.log("data recent matches => ", data);
      this.addRecentMatchesInfo(data);
    })
  }

  addRecentMatchesInfo(listMatches: any) {
    console.log("Debug addRecentMatchesInfo");
    if (listMatches != null) {
      listMatches.forEach(element => {
        this.profileInfo.avgWinrate += 0;
        this.profileInfo.avgKills += Number(element.kills) / Number(listMatches.length);
        this.profileInfo.avgDeaths += element.deaths;
        this.profileInfo.avgAssists += element.assists;
        this.profileInfo.avgGPM += element.gold_per_min;
        this.profileInfo.avgXPM += element.xp_per_min;
        this.profileInfo.avgLH += element.last_hits;
      });
    }
  }

  addProfileInfo(steamInfo: any) {
    console.log("Debug addProfileInfo");
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
