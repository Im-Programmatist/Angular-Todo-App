import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

	counter = 0;
	constructor() { 
	}
    ngOnInit() {
    }
	
	//Decorator that declares a DOM event to listen for, 
	//and provides a handler method to run when that event occurs.
	@HostListener('window:keydown.enter', ['$event'])
	handleKeyDown(event: KeyboardEvent) {
		this.counter++;
		alert(this.counter)
	}
}
