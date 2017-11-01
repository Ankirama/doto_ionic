import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileProvider {

  constructor(public http: Http) {
    console.log('Hello ProfileProvider Provider');
  }

  getDotaAccount(steamId = 47747863) {
    console.log("Profile provider getDotaAccount")
    return new Promise(resolve => {
      this.http.get("https://api.opendota.com/api/players/" + steamId)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data);
      })
    })
  }

  getWinsLosses(steamId = 47747863) {
    console.log("Profile provider getWinsLosses")
    return new Promise(resolve => {
      this.http.get("https://api.opendota.com/api/players/" + steamId + "/wl")
      .map(res => res.json())
      .subscribe(data => {
        resolve(data);
      })
    })
  }

  getRecentMatches(steamId = 47747863) {
    console.log("Profile provider getWinsLosses")
    return new Promise(resolve => {
      this.http.get("https://api.opendota.com/api/players/" + steamId + "/recentMatches")
      .map(res => res.json())
      .subscribe(data => {
        resolve(data);
      })
    })
  }
}
