import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	//templateUrl: './app.component.html',
	templateUrl: './app.homecomponent.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
	title = 'AngApp';
	constructor() {
        console.log('constructor');
		setInterval(() => {
			this.title = `AngApp ${new Date().getTime()}`;
		}, 5000);
    }
}
