import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
	constructor(private http: HttpClient) { }

	search(id, str) {
		return this.http.get<any>(`/Messages/${id}/Search/${str}`).pipe(map(response => {
			return response;
		}));
	}
}
