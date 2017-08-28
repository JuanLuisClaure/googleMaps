import { Component } from '@angular/core';

/**
 * Generated class for the MapComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'it-map',
  template: `<div #map id="gmaps" data-tap-disabled="true"></div>`
})
export class MapComponent {

  text: string;

  constructor() {
    console.log('Hello MapComponent Component');
    this.text = 'Hello World';
  }

}
