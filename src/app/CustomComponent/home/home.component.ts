import { Component, OnInit, HostListener, ElementRef , Input} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

	counter = 0;
	elementRef: ElementRef;
	title:string = "Implement Attribute Directives";
	txtsize = '25px';  
    colors = ['CYAN', 'GREEN', 'YELLOW'];  
    myColor = '';  

	constructor(ElementRef: ElementRef) { 
		this.elementRef = ElementRef;
		console.log('this is home component');
	}
    ngOnInit() {
    }
	
	/*
	@HostBinding and @HostListener are two decorators useful in custom directives. 
	@HostBinding lets you set properties on the element or component that hosts the directive, 
	and @HostListener lets you listen for events on the host element or component.
	*/
	//Decorator that declares a DOM event to listen for, 
	//and provides a handler method to run when that event occurs.
	@HostListener('window:keydown.enter', ['$event'])
	handleKeyDown(event: KeyboardEvent) {
		this.counter++;
		alert(this.counter)
	}
	 
}
