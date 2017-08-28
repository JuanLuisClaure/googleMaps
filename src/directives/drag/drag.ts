import {  Directive, ElementRef, Input, Renderer2, HostListener, Output, HostBinding, EventEmitter} from '@angular/core';
import { Platform  } from 'ionic-angular';
/**
/**
 * Generated class for the DragDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
  selector: '[drag]' // Attribute selector
})
export class DragDirective {


  constructor(public platform:Platform, public render:Renderer2) {
    console.log('Hello DragDirective Directive');
  }



}
