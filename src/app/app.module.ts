import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { FormPage } from '../pages/form/form';
import { HomePage } from '../pages/home/home';
import { RidelistPage } from '../pages/ridelist/ridelist';
import { StaticPage } from '../pages/static/static';
import { SearchPage } from '../pages/search/search';
import { MapProvider } from '../providers/map/map';
import { GoogleMaps,  } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { DragProvider } from '../providers/drag/drag';
import 'hammerjs';
import 'hammer-timejs';
var config = {
  apiKey: "AIzaSyAID5-ytwfqmJlPPourVZ-QhVT0nowpEG8",
  authDomain: "zupa-d966c.firebaseapp.com",
  databaseURL: "https://zupa-d966c.firebaseio.com",
  projectId: "zupa-d966c",
  storageBucket: "zupa-d966c.appspot.com",
  messagingSenderId: "1047111970402"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FormPage,
    RidelistPage,
    SearchPage ,
    StaticPage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule // imports firebase/auth, only needed for auth features
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FormPage,
    RidelistPage,
    SearchPage,
    StaticPage,


  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    Geolocation,
    MapProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DragProvider,
  ]
})
export class AppModule {}
