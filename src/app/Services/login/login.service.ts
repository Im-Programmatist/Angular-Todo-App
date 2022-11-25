import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

	//URL:string = 'https://reqres.in/api/login';
	URL:string = "https://dummyjson.com/auth/login";

 	constructor(private http: HttpClient) { 
	}

	public loginUser = (loginData:object):any => {
		// const body=JSON.stringify({
		// 	"email": "eve.holt@reqres.in",
		// 	"password": "cityslicka"
		// });
		const body=JSON.stringify(loginData);
		return this.http.post(this.URL, body);
	};
}
