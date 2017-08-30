import { Injectable, ElementRef, NgZone  } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Geolocation, Geoposition  } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  LatLng,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';



/*
  Generated class for the MapProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class MapProvider {
map = new GoogleMaps()

public lat: number = 100;
public lng: number = 200;
public watch: any;
  constructor(public http: Http, public geolocation: Geolocation, private googleMaps: GoogleMaps) {
  }

    //
    //
  conseguir():GoogleMaps{
    let yes = this.map
    return yes
  }

 reaseguros(ele: HTMLElement){
   let opt: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };
   let yes:GoogleMap = this.googleMaps.create(ele)
   return yes
 }

 observableMapInstance(instancia):Observable<any>{
    return instancia.on(GoogleMapsEvent.MAP_READY)
 }

 newlatlng(a,b):LatLng{
   let loc = new LatLng(a, b)
   return loc
 }

 camara(loc: LatLng){
   let options: CameraPosition = {
     target: loc,
     zoom: 15,
     tilt: 51,
     duration:5000
   }

    return options
 }

 createMark(loc:LatLng , title:string, icon:string){
   let markerOptions: MarkerOptions = {
     position: loc,
     title: title,
     icon:icon
   }
   return markerOptions
 }





  getPosition(): Observable<any>{

    let options = {
        frequency: 3000,
        enableHighAccuracy: true
      }

    return this.geolocation.watchPosition(options)
  }

  currentPosition():Promise<any>{
    return this.geolocation.getCurrentPosition()
  }




hacerPromesas(pro){
  let yes = new Promise((resolve, reject)=>{resolve(pro)})
  return yes
}
      // this.geolocation.getCurrentPosition({ maximumAge: 3000,  enableHighAccuracy: true })
      //
      // return yes
      //
    //
    // }
}
