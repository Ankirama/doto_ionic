import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalSteamPage } from './modal-steam';

@NgModule({
  declarations: [
    ModalSteamPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalSteamPage),
  ],
})
export class ModalSteamPageModule {}
