import { Component, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { LatLng } from '@ionic-native/google-maps';

import { MapProvider } from '../../providers/map/map';
import { DragProvider } from '../../providers/drag/drag';


import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';


export interface orderShopIterface {
    position:LatLng,
    title:string,
    icon:string
}
/**
 * Generated class for the RidelistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ridelist',
  templateUrl: 'ridelist.html',
})
export class RidelistPage {

  @ViewChild('googlemapsCarreras') ele: ElementRef;
  mapa: any
  inst:any
  index: number = 0
  orderShopPair: orderShopIterface[]




  constructor(
    public navCtrl: NavController,
    public parametros: NavParams,
    public loadingCtrl: LoadingController,
    public mapProvider: MapProvider,
    public dragProvider: DragProvider
  ) {
  }

  ngOnInit() {
    this.mapa = this.parametros.data.googleMap
    this.inst = this.parametros.data.instancia
  }
  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando Mapa...'
    })
    loading.present();

    setTimeout(() => {
      if (this.mapa != null) {
        this.mapa.setDiv()
        let ele = this.ele.nativeElement
        this.mapa.setDiv(ele)
        loading.dismiss();
        console.log('Creando Carreras-map')
      }
    }, 3000)
  }
  ngOnDestroy() {
    if (this.mapa.getDiv()) {
      this.mapa.setDiv()
      console.log('Quitando Carreras-map')
    }
  }


  x(i) {
    this.dragProvider.getShopOrders(2, 'lermbkern').subscribe(val => {

      let yes = val[i];
      if (this.index > 0) {
        this.juntarOrdenShopMapa(yes)
        this.index--
        console.log('ahora index es ', this.index, ' osea el pedido es ', i)
      } else {
        this.index = this.index
        console.log('no existen mas pedidos', this.index)
      }

    })
  }

  y(i) {
    this.dragProvider.getShopOrders(2, 'lermbkern').subscribe(val => {
      let yes = val[i];
      if (this.index < val.length) {
        this.juntarOrdenShopMapa(yes)
        this.index++
        console.log('ahora index es ', this.index, ' osea el pedido es ', i)
      } else {
        this.index = this.index - 1
        console.log('no existen mas pedidos', this.index)
      }

    })
  }

  juntarOrdenShopMapa(order) {
            let lat  = order.latitude
            let lng  = order.longitude
            let nameOrder = order.name
            let mapShop = this.dragProvider.db.object(`ShopMetas/${order.shop_key}`)

           Observable.combineLatest(mapShop).subscribe(val => {


               let ae   = val[0].latitude
               let ou   = val[0].longitude
               let nameShop = val[0].name

               this.orderShopPair = [
                 {
                   position:this.mapProvider.newlatlng(lat, lng),
                   title: nameOrder,
                   icon: 'www/assets/icon/driver.png'
                 },
                {
                  position:this.mapProvider.newlatlng(ae, ou),
                  title: nameShop,
                  icon: 'www/assets/icon/restaurant.png'
                }
              ];

              this.orderShopPair.forEach((m)=>{
                let mrk  = this.mapProvider.createMark(m.position, m.title, m.icon)
                this.mapa.addMarker(mrk).then(()=>{
                  console.log('listo')
                })
              });

           })
  }

  mostrarEnMapa(){

    let a = this.inst._spherical.computeDistanceBetween(this.orderShopPair[0].position, this.orderShopPair[1].position)
    console.log(a)
    this.mapa.moveCamera({
        target: {lat: -17.7862, lng:  -63.18117},
        zoom: 13,
        tilt: 60,
        bearing: 140,
        duration: 5000,
        padding: 0  // default = 20px
      })

  }



}
