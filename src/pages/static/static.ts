import { Component, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

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

mapa:any

  constructor(public navCtrl: NavController, public parametros: NavParams, public loadingCtrl: LoadingController) {
  }
  ngOnInit(){
    this.mapa = this.parametros.data.googleMap
  }
  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando Mapa...'
    })
    loading.present();

    setTimeout(()=>{
      if(this.mapa != null){
        this.mapa.setDiv()
        let ele = this.lmnt.nativeElement
        this.mapa.setDiv(ele)
        loading.dismiss();
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
