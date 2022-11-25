import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Injector, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor 
{
	constructor(private auth: AuthService, private router: Router) {
		console.log('TokenInterceptor constructor called.');
	}
	
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// const currentUser = { token:'abcdg24675b'} || JSON.parse(localStorage.getItem('currentUser'));
		const token = this.auth.getToken();
		var headerOption = {
			'Content-Type': 'application/json',
			//'Access-Control-Allow-Methods:': 'PUT, POST, OPTIONS',
			//'Access-Control-Allow-Credentials': true,
			//'Access-Control-Max-Age': 240,
			'Access-Control-Allow-Origin': '*'
		};
		if (token && !request.url.includes('login')) {
			headerOption['Authorization'] = token;
		}

		request = request.clone({
			setHeaders:headerOption
		});
		return next.handle(request).pipe(tap(
			(event: HttpEvent<any>) => {
				if (event instanceof HttpResponse) {  
					// do stuff with response if you want  
				}
			},
			(err: any) => {
				if (err instanceof HttpErrorResponse) {
					if (err.status !== 401) {
						return;
					}
					this.router.navigate(['login']);
				}
			}
		));
	}
}
