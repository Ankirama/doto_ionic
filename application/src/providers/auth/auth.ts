import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export class UserData {
  id: string;
  email: string;
  steamID32?: string;
}

@Injectable()
export class AuthProvider {

  constructor(public af: AngularFireAuth, public ad: AngularFireDatabase) {
    console.log('Hello AuthProvider Provider');
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

  /**
  ** @brief: Get user email + steamID32 from database via promise
  */
  getCurrentUser(): Promise<UserData> {
    let currentUser = this.af.auth.currentUser;
    return new Promise((resolve, reject) => {
      if (currentUser) {
        return this.ad.database.ref('/users/' + currentUser.uid).once('value')
          .then(snapshot => {
            console.log('debug here => ', snapshot.val());
            let userData: UserData = {
              id: snapshot.val().uid,
              email: snapshot.val().email,
              steamID32: snapshot.val().steamID32
            }
            return resolve(userData);
          })
          .catch(err => {
            return reject(err);
          });
      } else {
        return resolve(null);
      }
    });
  }
}
