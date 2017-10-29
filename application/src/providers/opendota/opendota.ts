import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

/*
  Generated class for the OpendotaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OpenDotaProvider {

    private apiURL: string =  "https://api.opendota.com/api";
    error: string = null;

    constructor(public http: Http) {
        console.log('Hello OpendotaProvider Provider');
    }

    getMatches(steamID32: string, offset: number = 0, limit: number = 10) {
        return this.http.get(this.apiURL + "/players/" + steamID32 + "/matches?limit=" + limit + "&offset=" + offset)
            .map((res: Response) => {
                console.log('debug ==>', res.json());
                return res.json();
            })
            .catch(error => {
                console.log('debug error getMatches => ', error);
                return Observable.throw(new Error('Unable to get your matches... Try again later.'));
            });
    }
}
