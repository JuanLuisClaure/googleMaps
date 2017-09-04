import { Component, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { LatLng } from '@ionic-native/google-maps';

import { MapProvider } from '../../providers/map/map';
import { DragProvider } from '../../providers/drag/drag';


import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';


export interface orderShopIterface {
  position: LatLng,
  title: string,
  icon: string
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
  inst: any
  index: number = 0
  markers: Array<any> = []
  orderShopPair: orderShopIterface[]




  constructor(
    public navCtrl: NavController,
    public parametros: NavParams,
    public loadingCtrl: LoadingController,
    public mapProvider: MapProvider,
    public dragProvider: DragProvider,
    public alertCtrl: AlertController
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


  x() {

    this.dragProvider.getShopOrders(2, 'lermbkern').subscribe(val => {
      if (this.index < val.length && this.index >= 0) {
        let yes = val[this.index]
        this.juntarOrdenShopMapa(yes)
        console.log('se abrio un pedodo => ', this.index)
        this.index--
      } else {
        this.alertaPedidos()
      }

    })
  }

  y() {

    this.dragProvider.getShopOrders(2, 'lermbkern').subscribe(val => {
      if (this.index < val.length && this.index >= 0) {
        let yes = val[this.index];
        this.juntarOrdenShopMapa(yes)
        console.log('se abrio un pedodo => ', this.index)
        this.index++
      } else {
        this.alertaPedidos()
      }

    })
  }

  juntarOrdenShopMapa(order) {
    let lat = order.latitude
    let lng = order.longitude
    let nameOrder = order.name
    let mapShop = this.dragProvider.db.object(`ShopMetas/${order.shop_key}`)

    Observable.combineLatest(mapShop).subscribe(val => {


      let ae = val[0].latitude
      let ou = val[0].longitude
      let nameShop = val[0].name

      this.orderShopPair = [
        {
          position: this.mapProvider.newlatlng(lat, lng),
          title: nameOrder,
          icon: 'www/assets/icon/driver.png'
        },
        {
          position: this.mapProvider.newlatlng(ae, ou),
          title: nameShop,
          icon: 'www/assets/icon/restaurant.png'
        }
      ];

      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setVisible(false)
      }
      this.markers = []
      

      this.orderShopPair.map((m) => {
        let mrk = this.mapProvider.createMark(m.position, m.title, m.icon)
        this.mapa.addMarker(mrk).then((m) => {
          this.markers.push(m)
        })
      })

      this.mapa.moveCamera({
        target: this.mapProvider.newlatlng(ae, ou),
        zoom: 13,
        tilt: 60,
        bearing: 0,
        duration: 5000,
        padding: 0  // default = 20px
      })

      this.mapa.addPolyline({
        points: [this.orderShopPair[0].position, this.orderShopPair[1].position],
        'color': '#AA00FF',
        'width': 10,
        'geodesic': true
      })


      let a = this.inst._spherical.computeDistanceBetween(this.orderShopPair[0].position, this.orderShopPair[1].position)
      console.log(a, 'distancia order')

    })
  }


  alertaPedidos() {
    let alert = this.alertCtrl.create({
      title: 'No existen mas pedidos',
      message: 'Comenzar de nuevo?',
      buttons: [
        {
          role: 'cancel',
          handler: () => {
            this.index = 0
            console.log('primer pedido');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.index = 0
            console.log('Primer pedido');
          }
        }
      ]
    });
    alert.present();
  }



}
