import { Directive } from '@angular/core';

/**
 * Generated class for the MapDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
  selector: '[map]' // Attribute selector
})
export class MapDirective {

  constructor() {
    console.log('Hello MapDirective Directive');
  }

}
