import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { SharedService } from '../../Services/shared/shared.service';
import { ParentcomponentComponent } from './parentcomponent.component';
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
				<div>
					<label>Data get by injecting parent class in child constructor and use class-object to get data - </label>
					<br/>
					<span style="color:red">{{parentComponentData}}</span>					
					<br/>
				</div>
			<br/>
			<br/>
		</div>`
})
export class ChildcomponentComponent implements OnInit, AfterViewInit {

	public dataFromSharedService :any;
	public parentComponentData: any;
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

	constructor(private sharedService: SharedService, public ParentcomponentComponent: ParentcomponentComponent ){
		console.log(`testing child component`);
	}

	@Output() newItemEmitChildToParent = new EventEmitter<string>();

	ngOnInit(): void {
		console.log(`in ng init _inputData `, this._inputData, this.inputData);
		this.parentComponentData = this.ParentcomponentComponent.onlyParenData;
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
