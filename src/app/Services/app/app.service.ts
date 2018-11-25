import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AppService {
	constructor(private http: HttpClient) { }

	SaveDeviceToken(token: string) {
		return this.http.post<any>('/App/DeviceToken', {token : token}).pipe(map(response => {
			return response;
		}));
	}
}
