import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatatableService {

	URL:string = "";

	constructor(private http: HttpClient) { }

	public fetchDatatableDetails = (pageNo, limit):any => {
		return this.http.get(`https://dummyjson.com/products?limit=${limit}&skip=${10*pageNo}`);
	};

}
