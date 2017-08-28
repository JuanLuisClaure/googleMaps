import { Component , ViewChild,  ElementRef, NgZone, Input} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapProvider } from '../../providers/map/map';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
/**
 * Generated class for the SearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

    @ViewChild('googlemapsBeta') element: ElementRef;

    map:any
    mapa:any
    cal:any
    marker:any
    // orderShopPair: any[] = [
    //   {
    //     position:this.mapProvider.newlatlng(-17.781781, -63.164459),
    //     title:'SHOP',
    //     icon: 'www/assets/icon/restaurant.png'
    //   },
    //   {
    //     position:this.mapProvider.newlatlng(-17.78064636, -63.18280208),
    //     title:'ORDER',
    //     icon: 'www/assets/icon/driver.png'
    //   },
    // ];

  constructor(public navCtrl: NavController, public navParams: NavParams,public mapProvider: MapProvider,public zone: NgZone,public parametros: NavParams) {
  }


  ngOnInit(){

    this.mapa = this.parametros.data.googleMap
    // this.cal = this.map._spherical
    // let ele  = this.element.nativeElement
    // this.mapa = this.mapProvider.reaseguros(ele)
    // this.mapProvider.currentPosition().then((res)=>{
    //            let loc  = this.mapProvider.newlatlng(res.coords.latitude, res.coords.longitude)
    //            let mrk  = this.mapProvider.createMark(loc, 'GPS', 'www/assets/icon/rocket.png')
    //            this.map.addMarker(mrk).then((marker)=>{this.marker = marker})
    //      })
  }


  ngAfterViewInit(){

        if(this.mapa != null){
          this.mapa.setDiv()
          let ele = this.element.nativeElement
          this.map = this.mapa.setDiv(ele)
          console.log('Creando mapa')
        }

        this.cargarMap()
  }

  cargarMap(){

  this.mapProvider.getPosition().subscribe((res)=>{
       let locs = this.mapProvider.newlatlng(res.coords.latitude, res.coords.longitude)
       let opt = this.mapProvider.camara(locs)
       let mrk = this.mapProvider.createMark(locs, 'GPS', 'www/assets/icon/rocket.png')
       if(this.marker != null){
         this.marker.setPosition(locs)
         this.map.moveCamera(opt)
       }else{
         this.map.moveCamera(opt)
         this.map.addMarker(mrk)
       }
     })
  }


  nuevoPedido(){

  }
  //TODO
  //aca este una funcion para hacer un circulo alrededor de la latLng
  // let u = this.map.addCircle({
  //     'center': locs,
  //     'radius': 3000,
  //     'strokeColor' : '#AA00FF',
  //     'strokeWidth': 5,
  //     'fillColor' : 'transparent'
  //   })
  // u.then((sa)=>{
  //   console.log(sa.getBounds(), 'llegamos')
  // })


  // nuevoPedido(){
  //   this.orderShopPair.forEach((m)=>{
  //     let mrk  = this.mapProvider.createMark(m.position, m.title, m.icon)
  //     this.map.addMarker(mrk).then((y)=>{
  //       this.map.setCameraBearing(300)
  //     })
  //   });
  // }
  //
  // // hacerConsole(){
  // //   let yes = this.cal.computeDistanceBetween(this.orderShopPair[0].position, this.orderShopPair[1].position)
  // //   let que = this.map.addPolyline({
  // //      points: [this.orderShopPair[0].position, this.orderShopPair[1].position],
  // //     'color' : '#AA00FF',
  // //     'width': 10,
  // //     'geodesic': true
  // //   })
  // //
  // // }



  ngOnDestroy(){
    if(this.mapa.getDiv()){
      this.mapa.setDiv()
      console.log('Quitando Mapa')
    }
  }

}
