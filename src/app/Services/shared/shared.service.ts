import { Injectable, Input, Output, EventEmitter } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class SharedService {

	@Output() changeRouteVisibilityEvent: EventEmitter<any> = new EventEmitter();

	constructor() {
	}
 
	changeRouteVisibility() {
		this.changeRouteVisibilityEvent.emit(true);
	}
 
	getEmittedValueVisibility() {
		return this.changeRouteVisibilityEvent;
	}
}
