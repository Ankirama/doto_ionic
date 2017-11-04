import { Component } from '@angular/core';

import { MatchesPage } from '../matches/matches';
import { SteamLoginPage } from '../steam-login/steam-login';
import { ProfilPage } from '../profil/profil';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MatchesPage;
  tab2Root = ProfilPage;
  tab3Root = SteamLoginPage;

  constructor() {

  }
}
