import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { SharedService } from '../../Services/shared/shared.service';

@Component({
selector: 'app-childcomponent',
template: `<div>
			<div>This is child</div>
			<label>{{ inputData }}</label>
			<br/>
			<button type="button" 
				(click)="tryToEMitDataFromChildToParent('data from child')"> 
					Click here to Pass Data from Child To Parent
			</button>
			<br/>
			<label>Data by shared service - </label>
			<p>{{ dataFromSharedService }}</p>
			<br/>
			<br/>
			<br/>
		</div>`
})
export class ChildcomponentComponent implements OnInit, AfterViewInit {

	public dataFromSharedService :any;
	@Input()
	set inputData(value:any) {
		value.push('abc');
		value.push('xyz');
		this._inputData = value;
	};
	get inputData():any {
		return this._inputData;
	};
	_inputData:any;

	constructor(private sharedService: SharedService){
		console.log(`testing child component`);
	}

	@Output() newItemEmitChildToParent = new EventEmitter<string>();

	ngOnInit(): void {
		console.log(`in ng init _inputData `, this._inputData, this.inputData);
	}

	tryToEMitDataFromChildToParent(value: string) {
		this.newItemEmitChildToParent.emit(value);
	}

	ngAfterViewInit(): void {
		this.sharedService.getDataThroughSharedService().subscribe(item=> {
			console.log(
				`Data getting from shared service`,		
				item
			);
			return this.dataFromSharedService=item
		});
		
	}

}
