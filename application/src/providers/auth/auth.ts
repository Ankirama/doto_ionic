import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public af: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
  }

  loginWithEmail(credentials: any): void {
    return Observable.create(observer => {
      this.af.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
        .then((authData) => {
          console.log(authData);
          observer.next(authData);
        })
        .catch(observer.error);
    });
  }

  registerUser(credentials: any): void {
    return Observable.create(observer => {
      this.af.auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
        .then(authData => {
          console.log(authData);
          observer.next(authData);
        })
        .catch(observer.error);
    })
  }

  logout(): void {
    this.af.auth.signOut();
  }

  getCurrentUser(): any {
    return this.af.auth.currentUser ? this.af.auth.currentUser : null;
  }
}
