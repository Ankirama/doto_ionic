import { Component } from '@angular/core';

import { MatchesPage } from '../matches/matches';
import { SteamLoginPage } from '../steam-login/steam-login';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MatchesPage;
  tab2Root = SteamLoginPage;

  constructor() {

  }
}
