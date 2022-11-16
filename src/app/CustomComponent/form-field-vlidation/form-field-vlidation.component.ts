import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-field-vlidation',
  templateUrl: './form-field-vlidation.component.html',
  styleUrls: ['./form-field-vlidation.component.css']
})
export class FormFieldVlidationComponent implements OnInit{
	
	@Input() errorMsg: string;
  	@Input() displayError: boolean;
	@Input() errorMsgType: string;

	constructor(){
		console.log('FOrm Validtion Constructor called');
	}

	ngOnInit():void {
		console.log('FOrm Validtion ngOnInit called');
	}
} 
