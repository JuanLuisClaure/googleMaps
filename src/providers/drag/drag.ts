import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';
/*
  Generated class for the DragProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DragProvider {
  constructor(public http: Http, public db: AngularFireDatabase, public afauth:  AngularFireAuth ) {

  }

  getShopOrders(role,$key) {

     return this.db.list('ShopOrders').switchMap(val => {
       if (val.length == 0) { return Observable.of(val) }
       let finalOrders = this.getOrders(val,role,$key).map($key => this.db.object(`Orders/${$key}`))

       return Observable.combineLatest(finalOrders);
     })

   }

   getOrders(val,role, $key) {
     if (role != 2) {
       let result = val.find(val => {
         return val.$key == $key
       }) || []
       return Object.keys(result).map(key => key);
     }
     return val.reduce((arr, val) => { return arr.concat(Object.keys(val)) }, [])
   }




  login(){
    let ayuda = this.afauth.auth.signInAnonymously()
    return ayuda
  }

}
