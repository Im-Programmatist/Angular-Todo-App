import { Injector, Injectable } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

	constructor(private router: Router) {
	};
	public getToken = () => {
		return localStorage.getItem('auth_token');
	};
	public logout = () => {
		localStorage.clear();
		sessionStorage.clear();
		this.router.navigateByUrl('/login');
	};
	public getAuthStatus = () => {
		if(localStorage.getItem('auth_token'))
			return true;
		else
			return false;		
	};
}
