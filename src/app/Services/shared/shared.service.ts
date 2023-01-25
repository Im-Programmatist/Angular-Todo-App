import { Injectable, Input, Output, EventEmitter } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class SharedService {

	@Output() changeRouteVisibilityEvent: EventEmitter<any> = new EventEmitter();

	@Output() shareDataEvent: EventEmitter<any> = new EventEmitter();

	constructor() {
	}
 
	changeRouteVisibility() {
		this.changeRouteVisibilityEvent.emit(true);
	}
 
	getEmittedValueVisibility() {
		return this.changeRouteVisibilityEvent;
	}

	setDataThroughSharedService(data) {
		console.log(`data in set shared service:`,data);
		this.shareDataEvent.emit({'type': 'share data', 'value': 'Testing data', ...data});
	}

	getDataThroughSharedService() {
		return this.shareDataEvent;
	}
}
