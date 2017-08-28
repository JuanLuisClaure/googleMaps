import { Component, ViewChild, Renderer2, ElementRef, Input, Output, NgZone  } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { MapProvider } from '../../providers/map/map';
import { DragProvider } from '../../providers/drag/drag';

import { BasePage } from '../basePage';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';





@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('googlemaps') element: ElementRef;





 map:any
 ele:any
 x: number = 300;
 y: number = 222;
 startX: number;
 startY: number;
 index:number = 0

 // arrayLocation: Array<any> = []
 // latGps:any
 // lngGps:any
 // latShop:any
 // lngShop:any
 // latOrder:any
 // lngOrder:any
 currentPosition: Observable<any>
  constructor( public  platform:Platform,
     public navCtrl: NavController,
     public render: Renderer2,
     public mapProvider:MapProvider,
     public dragProvider: DragProvider,
     public zone: NgZone) {
  }

  ngOnInit(){

  }

//   ngAfterViewInit(){
//     this.map = this.mapProvider.loadMap()
//     this.mapProvider.getPosition().subscribe((res)=>{
//           this.zone.run(()=>{
//             this.latGps = res.coords.latitude
//             this.lngGps = res.coords.longitude
//           })
//       })
//     // this.element = document.getElementById('map')
//     // this.currentPosition = this.mapProvider.getPosition()
//   }
//
//   //NOTE
//   //ca da funcion es un pasiot de luz
//   //
// increible(){
//   let ele  = this.element.nativeElement
//   this.map = this.mapProvider.reaseguros(ele)
//
//   this.mapProvider.observableMapInstance(this.map).subscribe((respuesta)=>{
//
//               // this.arrayLocation.map((res)=>{
//               //
//               //   let markerOptions = {
//               //    position:{
//               //      lat:res.lat ,
//               //      lng:res.lng
//               //    },
//               //    icon: "assets/images/icons8-Marker-64.png",
//               //    title: res.name
//               //  }
//               // console.log(markerOptions, 'verifincando')
//               //  let yes  = this.map.addMarker(markerOptions).then((marker) => {
//               //                                                marker.showInfoWindow()
//               //                                                console.log(marker, 'cambio de nuevo')
//               //
//               //                                            });
//
//               // })
//
//
//
//
//               //  //snippet:string	The snippet of the infoWindow.
//               //  //infoWindowAnchor	number[]Specify the anchor of the InfoWindow
//               //   //draggable	boolean	Set true if you want to enable to drag the marker. (Default: false) Important! Drag starts after long pressed on the marker.
//               //   //flat	boolean	Set true if you want to use a flat marker. (Default: false)
//               //   //rotation	number	Set rotation angle. (Default: 0)
//               //   //visible	booleanSet false if you want to hide. (Default: true)
//               //   //styles	any Specify the options for title. This property work for normal InfoWindow.
//               //   //animation	string Which animation to play when marker is added to a map.
//               //   //zIndex	numberHigher zIndex value overlays will be drawn on top of lower zIndex value tile layers and overlays.
//               //   //disableAutoPan	boolean	Set to true to disable auto panning when the marker is clicked.
//               // };
//
//       })
// }
//
login(){
  this.dragProvider.login().then((onResolve)=>{
      console.log(onResolve, 'logueado')
  })
}
//
// verTienda(){
//   console.log('es un bton nada mas')
// }
//
//
// verPedidos(index){
//   this.dragProvider.getShopOrders(2,'lermbkern').subscribe(val => {
//
//         let yes =  val[index]
//         this.index ++
//         if(this.index <= val.length){
//           this.agarrarElshop(yes)
//         }else{
//           this.index = 0
//           console.log('no haymas pedidos en este momento')
//         }
//
//   })
// }
//
//
// agarrarElshop(val){
//                 this.latOrder = val.latitude
//                 this.lngOrder = val.longitude
//             let mapShop = this.dragProvider.db.object(`ShopMetas/${val.shop_key}`)
//
//            Observable.combineLatest(mapShop).subscribe(val => {
//
//                this.latShop   = val[0].latitude
//                this.lngShop   = val[0].longitude
//                this.ponerArray()
//
//            })
// }
//
//
// ponerArray(){
//   this.zone.run(()=>{
//     console.log(this.index, 'siguiente')
//     this.arrayLocation = [
//            {
//              name:'GPS',
//              lat:this.latGps,
//              lng:this.lngGps
//            },
//            {
//              name:'Shop',
//              lat:this.latShop,
//              lng:this.lngShop
//            },
//            {
//              name:'Order',
//              lat:-this.lngOrder,
//              lng: this.latOrder
//            }
//          ]
//   })
// }
































  onPanStart(event: any): void {
    this.startX = this.x
    this.startY = this.y
  }

  onPan(event: any): void {
    this.x = this.startX + event.deltaX;
    this.y = this.startY + event.deltaY;
  }

  ondrop(event:any): void{
    this.x =  this.platform.width() - 51
    this.y =  this.y
  }


}
