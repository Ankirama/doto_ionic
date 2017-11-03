import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SteamLoginValidPage } from './steam-login-valid';

@NgModule({
  declarations: [
    SteamLoginValidPage,
  ],
  imports: [
    IonicPageModule.forChild(SteamLoginValidPage),
  ],
})
export class SteamLoginValidPageModule {}
