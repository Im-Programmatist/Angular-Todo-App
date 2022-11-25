import { Injectable } from '@angular/core';
//import { Toast, ToastModel } from '@syncfusion/ej2-notifications'; // Import the toast component
import { Toast } from 'bootstrap';
import { BehaviorSubject } from 'rxjs';

export const TOAST_STATE = {
	success: 'success-toast',
	warning: 'warning-toast',
	danger: 'danger-toast',
};

@Injectable({
	providedIn: 'root',
})

export class ToastService {

	public showsToast$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	public toastMessage$: BehaviorSubject<string> = new BehaviorSubject<string>('Default Toast Message');
	public toastState$: BehaviorSubject<string> = new BehaviorSubject<string>(TOAST_STATE.success);

	constructor() {}

	showToast(toastState: string, toastMsg: string): void {
		// Observables use '.next()' to indicate what they want done with observable
		// This will update the toastState to the toastState passed into the function
		this.toastState$.next(toastState);

		// This updates the toastMessage to the toastMsg passed into the function
		this.toastMessage$.next(toastMsg);

		// This will update the showsToast trigger to 'true'
		this.showsToast$.next(true);

		setTimeout(() => {      
			this.dismissToast();    
		}, 3000);  
	}

	// This updates the showsToast behavioursubject to 'false'
	dismissToast(): void {
		this.showsToast$.next(false);
	}
}
