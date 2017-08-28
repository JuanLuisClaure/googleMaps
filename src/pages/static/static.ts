import { Component, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the StaticPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-static',
  templateUrl: 'static.html',
})
export class StaticPage {

  @ViewChild('googlemapsTaxis') lmnt: ElementRef;
map:any
mapa:any

  constructor(public navCtrl: NavController, public parametros: NavParams) {
  }
  ngOnInit(){
    this.mapa = this.parametros.data.googleMap
  }
  ionViewDidLoad() {
    setTimeout(()=>{
      if(this.mapa != null){
        this.mapa.setDiv()
        let ele = this.lmnt.nativeElement
        this.map  = this.mapa.setDiv(ele)
        console.log('Creando Staic-map')
      }
    }, 3000)
  }
  ngOnDestroy(){
    if(this.mapa.getDiv()){
      this.mapa.setDiv()
      console.log('Quitando Static-map')
    }
  }
}
