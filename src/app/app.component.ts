import { Component, ViewChild,  ElementRef } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { RidelistPage } from '../pages/ridelist/ridelist';
import { StaticPage } from '../pages/static/static';
import { SearchPage } from '../pages/search/search';


import { MapProvider } from '../providers/map/map';

export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabComponent?: any;
}






@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  map:any

    appPages: PageInterface[] = [
      {title: 'Pedidos-map', component: HomePage, index: 1, icon: 'map'},
      {title: 'Cliente-map', component: RidelistPage, index: 2, icon: 'car'},
      {title: 'Shop-map',    component: StaticPage, index: 3, icon: 'information-circle'},
      {title: 'Taxi-map',    component: SearchPage, index: 4, icon: 'map'},
    ];


  @ViewChild(Nav) private nav: Nav;



  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public mapProvider: MapProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      let ele = document.getElementById('ojo')
      this.map = this.mapProvider.reaseguros(ele)
      this.openPage(this.appPages[0])
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }


  openPage(page: PageInterface) {
  // the nav component was found using @ViewChild(Nav)
  // reset the nav to remove previous pages and only have this page
  // we wouldn't want the back button to show in this scenario

  if (page.index) {
    this.nav.setRoot(page.component, { tabIndex: page.index, googleMap: this.map });
  } else {
    this.nav.setRoot(page.component).catch(() => {
      console.log("Didn't set nav root");
    });
  }
}


}
