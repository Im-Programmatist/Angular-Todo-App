import { Component, OnInit, HostListener, ElementRef , Input } from '@angular/core';
import { SharedService } from '../../Services/shared/shared.service';

@Component({
  selector: 'app-parentcomponent',
  template: `<div>
			  <div>This is Parent</div>
			  <div>
				<br/>
				<div appAttributesDirectives defaultValue="blue" dynamicColor="colors[0]" textColor="black" backGroundColor="CYAN" textSize="30px" divBorder="2px"> 
				  <div> 
					<label>Custom Attribute Directives used: click over below line to change color</label> 
					<div>customTheme Directive Demo with Custom Settings</div>
				  </div>  
				</div>
				<br/>
				<div style="margin-bottom:20px">
				  <label>Custom Structural Directive Used: This will work opposite of *ngif </label>
				  <h1 *appStructuralDirective="true">
					<label><span><b><i>True</i></b></span></label>
				  </h1>
				  <h1 *appStructuralDirective="false">
					<label><span><b><i>False</i></b></span></label>
				  </h1>
				</div>  
				<br/>
				<button type="button" (click)="sendDataThroughSharedServie()"> Try To Share Data Using SHared Service (Click Here)</button>
			  </div>
			  <br/>
			  <h3>Input Decorators With Setter and Getter</h3>
			  <app-childcomponent [inputData]="colors" (newItemEmitChildToParent)="newItemGetFromChild($event)"> </app-childcomponent>
			</div>`
})
export class ParentcomponentComponent implements OnInit{

	elementRef: ElementRef;
	title:string = "Implement Attribute Directives";
	txtsize = '25px';  
    colors = ['CYAN', 'GREEN', 'YELLOW'];  
    myColor = '';  

	constructor(ElementRef: ElementRef, private sharedService: SharedService) { 
		this.elementRef = ElementRef;
		console.log('this is home component');
	}
    ngOnInit() {
    }

	newItemGetFromChild($event) :void {
		alert($event);
	}
	//Pass data through shared service once this data emit all subscriber can receive it immediately 
	sendDataThroughSharedServie(){
		this.sharedService.setDataThroughSharedService({"name":"chetan","date": new Date().getTime()})
	}
}
