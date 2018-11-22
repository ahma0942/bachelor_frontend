import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProfileService {
	constructor(private http: HttpClient) { }

	getProfile() {
		return this.http.get<any>(`/User/Profile`).pipe(map(response => {
			// Response
		}));
	}
}
