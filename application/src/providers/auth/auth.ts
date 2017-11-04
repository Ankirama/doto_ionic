import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export class UserData {
  email: string;
  steamID32?: string;
}

@Injectable()
export class AuthProvider {

    constructor(private af: AngularFireAuth, private ad: AngularFireDatabase) {
    }

    loginWithEmail(credentials: any) {
        return this.af.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
    }

    /**
     ** @brief: Create a user via firebase auth and add it in our database
     ** @return: callback(error, data)
     */
    registerUser(credentials: any, cb) {
        return this.af.auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
            .then(user => {
                return cb(null, this.ad.database.ref('/users')
                          .child(user.uid)
                          .set({email: credentials.email, steamID32: ''}));
            })
            .catch(cb);
    }

    logout(): void {
        this.af.auth.signOut();
    }

    isLogged(): boolean {
        return this.af.auth.currentUser != null;
    }

    addSteamID(steamid32: string) {
        return new Promise((resolve, reject) => {
            this.af.authState.subscribe(currentUser => {
                return this.ad.database.ref('/users/')
                     .child(currentUser.uid)
                     .set({email: currentUser.email, steamID32: steamid32})
                     .then(resolve)
                     .catch(reject)
            }, error => {
                return reject(error);
            });
        })
    }

    /**
     ** @brief: Get user email + steamID32 from database via promise
     */
    getCurrentUser(): Promise<UserData> {
        return new Promise((resolve, reject) => {
            this.af.authState.subscribe(currentUser => {
                console.log('wowowoww => ', currentUser);
                if (currentUser) {
                    return this.ad.database.ref('/users/' + currentUser.uid).once('value')
                        .then(snapshot => {
                            console.log('debug here => ', snapshot.val());
                            let userData: UserData = {
                                email: snapshot.val().email,
                                steamID32: snapshot.val().steamID32
                            };
                            return resolve(userData);
                        })
                        .catch(err => {
                            return reject(err);
                        });
                } else {
                    return resolve(null);
                }
            });
        });
    }
}
