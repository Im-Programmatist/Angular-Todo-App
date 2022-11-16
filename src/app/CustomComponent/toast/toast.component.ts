import { Component, OnInit, Input } from '@angular/core';
import { Toast } from 'bootstrap';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

	@Input() tostObj: {
		messageType:string,
		message:string,
		showMessage:boolean
	};

	constructor(){
			
	}

	showToastMessage(data:{messageType:string, message:string, showMessage:boolean}):void {
		console.log('showToastMessage called with data -', data);
		this.tostObj = data;
		const toast = new Toast(document.getElementById('liveToast'))
		data.showMessage ? toast.show() : toast.hide();    	
	}
	whoAmI():string{
		console.log('whoAmI method from toast called');
		return 'whoAmI method from toast called';
	}

	ngOnInit(): void {
		console.info('ngOnInit');
		this.tostObj = {
			messageType:"default",
			message:"default",
			showMessage:false
		};
	}
}
