import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, LoadingController } from 'ionic-angular';
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
  loading;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, private http: Http, private modalCtrl : ModalController, private auth: AuthProvider, private loadingCtrl: LoadingController) {
    this.steamForm = formBuilder.group({
      username: [''],
    });
  }

  onSubmit(value: any): void {
    if(this.steamForm.valid) {
      this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      this.loading.present();
      this.http.get("/resolveVanity/?key=" + this.apiKey + "&vanityurl=" + value.username)
        .subscribe(data => {
          let steamid = data.json()["response"]["steamid"];
          if (steamid === undefined) {
            alert('Unable to find your username, please try again');
            this.loading.dismiss();
          } else {
            let steamid32 = new BigNumber(steamid).minus("76561197960265728").toString();
            this.getUserSummary(steamid).subscribe(data => {
              let players = data.json()["response"]["players"];
              if (players == undefined || players.length == 0)  {
                alert('Unable to find your username, please try again');
                this.loading.dismiss();
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
                      this.loading.dismiss();
                      this.navCtrl.setRoot(MatchesPage);
                    })
                    .catch(error => {
                      this.loading.dismiss();
                      console.log('dafuk => ', error);
                      alert('unable to set your steamid, please try again later.');
                    });
                  }
                });
                this.loading.dismiss();
                modal.present();
              }
            }, err => {
              this.loading.dismiss();
              console.log('error steam-login => ', err);
              alert('An error occured, please try again later...');
            });
            this.loading.dismiss();
            console.log("steamid32 => ", steamid32);
          }
        }, error => {
          this.loading.dismiss();
          console.log('error => ', error);
          alert('An error occured, please try again later...');
        });
    }
  }

  logout() {
    this.auth.logout(); 
    location.reload(); 
  }

  getUserSummary(steamid) {
    let url = "/user/?key=" + this.apiKey + "&steamids=" + steamid;
    return this.http.get(url);
  }

  ionViewDidEnter() {
    this.steamForm.reset();
  }

  ionViewDidLoad() {
  }
}
