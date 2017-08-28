import { NgModule } from '@angular/core';
import { MapDirective } from './map/map';
import { DragDirective } from './drag/drag';
@NgModule({
	declarations: [MapDirective,
    DragDirective],
	imports: [],
	exports: [MapDirective,
    DragDirective]
})
export class DirectivesModule {}
