import { AfterViewInit, Directive, OnInit, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[appStructuralDirective]',
})
export class StructuralDirectiveDirective implements OnInit, AfterViewInit {
	/*
		In angular there is two types of directives--
		1. Attributes Directives : Attributes directives are used to change behavior or appearance of the html examples are NgClass, NgStyle.
		2. Structural Directives: Structural Directives are used to add or remove the elements from the Dom examples are *ngIf, *ngFor etc. Structural directives start with *.
		3. Components : are directives with templates. The only difference between Components and the other two types of directives is the Template.
	*/

	/**
	 * @TemplateRef - 
	 * TemplateRef is a class and the way to reference the ng-template in the component or directive class. 
	 * Using the TemplateRef we can manipulate the template from component code. 
	 * 
	 * @ViewContainerRef - 
	 * ViewContainerRef represents a container where one or more views can be attached. 
	 * Any DOM element can be used as a view container. 
	 * We can use createEmbeddedView() function to attach the embedded templates in the container.
	*/

	private _templateRef: TemplateRef<any>;
	private _viewContainerRef: ViewContainerRef;
	@Input() set appStructuralDirective(condition: boolean) {
		//this will work opposite of *ngIf directive
		//*appStructuralDirective = true then element will not show 
		console.log(`this._templateRef`,this._templateRef);	
		if (!condition) {
			this._viewContainerRef.createEmbeddedView(this._templateRef);
		} 
		//*appStructuralDirective = false then element will show 
		else {
			this._viewContainerRef.clear();        
		}
	}
	constructor(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef) {
		this._templateRef = templateRef;
		this._viewContainerRef = viewContainerRef;
	}

	ngOnInit(): void {
		
	}

	ngAfterViewInit(): void {
		
	}
}
