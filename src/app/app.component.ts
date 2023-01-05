import { Component, OnInit } from '@angular/core';
import { AuthService } from './Services/auth/auth.service';
import { SharedService } from './Services/shared/shared.service';
import { ToastService, TOAST_STATE } from './Services/toast/toast.service';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';


@Component({
	selector: 'app-root',
	//templateUrl: './app.component.html',
	templateUrl: './app.homecomponent.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

	title = 'AngApp';
	isUserLogin:boolean = false;
	currentRoute = '/';
	constructor(
		private auth: AuthService, 
		private sharedService: SharedService,
		private toastService: ToastService,
		public router: Router,
		private _loc:Location
	) {
		//this.title = `AngApp ${new Date().getTime()}`;
		//this.isUserLogin = this.auth.getAuthStatus();   
		console.log('location ', this._loc.path());  
		this.activateClass(this._loc.path());
		// this.router.navigate([this._loc.path()]);
    }
	activateClass(routeId): void {
		setTimeout(()=>{
			$('li a').removeClass("active_new");  
			var routeArr = this._loc.path().split('/');
			var ids = (routeArr.length>2) ? `${routeArr[1]},#${routeArr[2]}` : `${routeArr[1]}`;
			$((ids!=='undefined')?`#${ids}`:`#home`).addClass('active_new');
			//$(`#${this._loc.path().split('/')[this._loc.path().split('/').length - 1]}`).addClass('active_new');
		},500);
	}
	logoutUser(): void {
		this.auth.logout();
		this.isUserLogin = this.auth.getAuthStatus(); 
		this.toastService.showToast( TOAST_STATE.danger, 'Log out successfully!')
	}
	ngOnInit(): void {
		this.isUserLogin = this.auth.getAuthStatus(); 
		this.sharedService.getEmittedValueVisibility().subscribe(item => this.isUserLogin = item);
	}

}
