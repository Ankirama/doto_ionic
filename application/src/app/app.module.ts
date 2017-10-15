import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { AuthPage } from '../pages/auth/auth';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';

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
    AuthPage,
    LoginPage,
    RegisterPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AuthPage,
    LoginPage,
    RegisterPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider
  ]
})
export class AppModule {}
