import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Http } from '@angular/http';
import { BigNumber } from 'bignumber.js'
import { ModalSteamPage } from '../modal-steam/modal-steam';
import { AuthProvider } from '../../providers/auth/auth';
import { MatchesPage } from '../matches/matches';

/**
 * Generated class for the SteamLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export class SteamUser {
  steamid32: string;
  username: string;
  avatar: string;
}

@IonicPage()
@Component({
  selector: 'page-steam-login',
  templateUrl: 'steam-login.html',
})
export class SteamLoginPage {

  apiKey: string = "459CB95F42E003F566ED61C775D0C2CF";  
  steamForm: FormGroup;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, private http: Http, private modalCtrl : ModalController, private auth: AuthProvider) {
    this.steamForm = formBuilder.group({
      username: [''],
    });
  }

  onSubmit(value: any): void {
    if(this.steamForm.valid) {

      this.http.get("/resolveVanity/?key=" + this.apiKey + "&vanityurl=" + value.username)
        .subscribe(data => {
          console.log('data => ', data.json());
          console.log('debug ==> ', data.json()["response"]);
          let steamid = data.json()["response"]["steamid"];
          console.log('debug steamid => ', steamid);
          if (steamid === undefined) {
            alert('Unable to find your username, please try again');            
          } else {
            let steamid32 = new BigNumber(steamid).minus("76561197960265728").toString();
            this.getUserSummary(steamid).subscribe(data => {
              let players = data.json()["response"]["players"];
              if (players == undefined || players.length == 0)  {
                alert('Unable to find your username, please try again');
              } else {
                let steamUser = {
                  steamid32: steamid32,
                  username: players[0]["personaname"],
                  avatar: players[0]["avatarfull"]
                };
                let modal = this.modalCtrl.create(ModalSteamPage,{'user': steamUser});
                modal.onDidDismiss(isValid => {
                  if (isValid) {
                    this.auth.addSteamID(steamid32)
                    .then(snapshot => {
                      this.navCtrl.setRoot(MatchesPage);
                    })
                    .catch(error => {
                      console.log('dafuk => ', error);
                      alert('unable to set your steamid, please try again later.');
                    });
                  }
                });
                modal.present();
              }
            }, err => {
              console.log('error steam-login => ', err);
              alert('An error occured, please try again later...');
            });
            console.log("steamid32 => ", steamid32);
          }
        }, error => {
          console.log('error => ', error);
          alert('An error occured, please try again later...');
        });
    }
  }

  getUserSummary(steamid) {
    let url = "/user/?key=" + this.apiKey + "&steamids=" + steamid;
    return this.http.get(url);
  }

  ionViewDidEnter() {
    console.log('reset form');
    this.steamForm.reset();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SteamLoginPage');
  }
}
