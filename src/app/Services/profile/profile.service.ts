import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import Profile from '@models/profile';

@Injectable({ providedIn: 'root' })
export class ProfileService {
	constructor(private http: HttpClient) { }

	getProfile() {
		return this.http.get<Profile>(`/User/Profile`).pipe(map(response => {
			return response;
		}));
	}

	saveProfile(name: string, email: string, phone: number, avatar: File = null) {
		const body = {};

		body['name'] = name;
		body['email'] = email;
		body['phone'] = phone;

		if (avatar) {
			body['file'] = avatar;
		}

		return this.http.post<any>(`/User/Profile`, body).pipe(map(response => {
			return response;
		}));
	}
}
