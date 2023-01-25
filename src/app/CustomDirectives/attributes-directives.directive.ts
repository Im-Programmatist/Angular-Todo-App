import { Directive, ElementRef, OnInit, Input, HostListener, AfterViewInit, HostBinding } from '@angular/core';

@Directive({
	selector: '[appAttributesDirectives]',
})
export class AttributesDirectivesDirective implements OnInit, AfterViewInit {
	
	/*
		In angular there is two types of directives--
		1. Attributes Directives : Attributes directives are used to change behavior or appearance of the html examples are NgClass, NgStyle.
		2. Structural Directives: Structural Directives are used to add or remove the elements from the Dom examples are *ngIf, *ngFor etc. Structural directives start with *.
		3. Components : are directives with templates. The only difference between Components and the other two types of directives is the Template.
	*/
	/*
		@HostBinding and @HostListener are two decorators useful in custom directives. 
		@HostBinding lets you set properties on the element or component that hosts the directive, 
		and @HostListener lets you listen for events on the host element or component.
	*/

	@Input('appAttributesDirectives') dynamicColor: string;  
    @Input() defaultValue: string;
		
	/*CUstom theme change*/
	@Input() textColor: string;
	@Input() backGroundColor: string;
	@Input() textSize: string;
	@Input() divBorder: string;

	colors = ['BROWN', 'GREEN', 'YELLOW', 'RED', 'BLUE', 'MAROON' ]; 
	private elementRef: ElementRef;

	constructor(ElementRef: ElementRef) {
		this.elementRef = ElementRef;
		this.textColor = this.textColor || "black";
		this.backGroundColor = this.backGroundColor || "Green";
		this.textSize = this.textSize || "15px";
		this.divBorder = this.divBorder || "2px";
	}

	ngOnInit(): void {
	}

	ngAfterViewInit(): void {
		//this.elementRef.nativeElement.style.backgroundColor = 'Yellow';
		//this.elementRef.nativeElement.style = this.theme;
		this.elementRef.nativeElement.style.color = this.textColor;  
		this.elementRef.nativeElement.style.backgroundColor = this.backGroundColor;  
		this.elementRef.nativeElement.style.fontSize = this.textSize; 
		this.elementRef.nativeElement.style.border = this.divBorder; 
	}

	@HostBinding('style.color') color!: string;
	@HostBinding('style.border-color') borderColor!: string;
	
	@HostListener('window:keyup', ['$event']) onKeyUp() {
		const colorPick = Math.floor(Math.random() * this.colors.length);
		this.color = this.colors[colorPick];
		this.borderColor = "black";
	}

    @HostListener('mouseover') onMouseOver() {  
    	this.changeBackgroundColor(this.dynamicColor || this.defaultValue);  
    }  
	@HostListener('mouseleave') onMouseLeave() {  
    	this.changeBackgroundColor('white');  
    }  
	@HostListener('click', ['$event.target']) onClick() { 
		const colorPick = Math.floor(Math.random() * this.colors.length);
		this.elementRef.nativeElement.style.backgroundColor = this.colors[colorPick];
	}  

    private changeBackgroundColor(color: string) {  
		console.log(`color ${color}`);
    	this.elementRef.nativeElement.style.backgroundColor = color;  
    }    

}
