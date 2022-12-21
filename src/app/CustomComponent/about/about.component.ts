import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

	constructor() { }
	testEvent(event):void {
		console.log(event.target.value);
		console.log( (event.target as HTMLInputElement).value);		
	}
}
