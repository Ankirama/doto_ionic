import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

export class HeroData {
    name: string;
    avatar: string;
}

export class MatchData {
    hero: HeroData;
    kills: number;
    assists: number;
    deaths: number;
    matchID: string;
    date: string;
    duration: string;
}

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

    getDotaAccount(steamID32: string) {
        return this.http.get(this.apiURL + '/players/' + steamID32)
            .map((res: Response) => {
                console.log('debug ==> ', res.json());
                return res.json();
            })
            .catch(error => {
                console.log("debug error getDotaAccount => ", error);
                return Observable.throw(new Error("Unable to get your dota profile... Try again later."));
            })
    }

    getWinsLosses(steamID32: string) {
        return this.http.get(this.apiURL + '/players/' + steamID32 + "/wl")
            .map((res: Response) => {
                console.log('debug ==> ', res.json());
                return res.json();
            })
            .catch(error => {
                console.log("debug error getWinsLosses => ", error);
                return Observable.throw(new Error("Unable to get your wins and losses... Try again later."));
            })
    }

    getRecentMatches(steamID32: string) {
        return this.http.get(this.apiURL + '/players/' + steamID32 + "/recentMatches")
            .map((res: Response) => {
                console.log('debug ==> ', res.json());
                return res.json();
            })
            .catch(error => {
                console.log("debug error getWinsLosses => ", error);
                return Observable.throw(new Error("Unable to get your recent matches... Try again later."));
            })
    }

    getHeroData(hero_id): Promise<HeroData> {
        return new Promise((resolve, reject) => {
            return this.http.get('https://raw.githubusercontent.com/viterb-c/dota2-api/master/data/heroes.json')
            .subscribe(data => {
                let hero = data.json()["heroes"].find(myObj => myObj.id == hero_id);
                if (hero === undefined) {
                    return reject(new Error("Unable to find your hero..."));
                } else {
                    let heroData: HeroData = {
                        name: hero["localized_name"],
                        avatar: "https://api.opendota.com/apps/dota2/images/heroes/" + hero["name"] + "_full.png"
                    };
                    return resolve(heroData);
                }
            }, error => {
                console.log('getHeroData error => ', error);
                return reject(new Error("Unable to find your hero..."));
            })
        })
    }

    getMatchById(matchId: string) {
        return this.http.get(this.apiURL + "/matches/" + matchId)
        .map((res: Response) => {
            console.log("debug => ", res.json());
            return res.json();
        })
        .catch(error => {
            console.log("debug error getMatch => ", error);
            return Observable.throw(new Error('Unable to get your match... Try again later.'));
        })
    }
}
