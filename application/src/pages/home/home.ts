import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { OpenDotaProvider } from '../../providers/opendota/opendota';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

    email: string;
    steamID32: string;
    matches = [];
    constructor(public navCtrl: NavController, private auth: AuthProvider, private api: OpenDotaProvider) {
        console.log("home constructor");
        auth.getCurrentUser()
            .then(data => {
                console.log('debug data -> ', data);
                if (data !== null) {
                    console.log('data !== null');
                    this.email = data.email;
                    if (data.steamID32 == undefined || data.steamID32 == "") {
                        this.steamID32 = "52415364"; // CHANGE ME
                    }
                    console.log('debug =====> ', this.steamID32);
                    this.getMatches(this.steamID32);
                }
            })
            .catch(err => {
                console.log('debug error => ', err);
            });
    }

    logout(): void {
        this.auth.logout();
        location.reload();
    }

    getMatches(steamID32) {
        this.api.getMatches(steamID32).subscribe(data => {
            console.log('debug data ==> ', data);
            this.matches = data;
        });
    }
}
