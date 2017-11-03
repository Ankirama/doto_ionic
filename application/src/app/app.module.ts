import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
import { AuthPage } from '../pages/auth/auth';
import { SteamLoginPage } from '../pages/steam-login/steam-login';
import { MatchesPage } from '../pages/matches/matches';
import { ModalSteamPage } from '../pages/modal-steam/modal-steam';
import { ProfilPage } from '../pages/profil/profil';
import { MatchPage } from '../pages/match/match';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthProvider } from '../providers/auth/auth';
import { OpenDotaProvider } from '../providers/opendota/opendota';
import { ProfileProvider } from '../providers/profile/profile';

export const firebaseConfig = {
  apiKey: "AIzaSyCk34f2nYQMUsbuKEJ_p7OPNQRLeA-G8Hg",
  authDomain: "doto-ionic.firebaseapp.com",
  databaseURL: "https://doto-ionic.firebaseio.com",
  projectId: "doto-ionic",
  storageBucket: "doto-ionic.appspot.com",
  messagingSenderId: "360271369487"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AuthPage,
    LoginPage,
    RegisterPage,
    SteamLoginPage,
    MatchesPage,
    ModalSteamPage,
    ProfilPage,
    MatchPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AuthPage,
    LoginPage,
    RegisterPage,
    SteamLoginPage,
    MatchesPage,
    ModalSteamPage,
    ProfilPage,
    MatchPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    OpenDotaProvider,
    ProfileProvider
  ]
})
export class AppModule {}
