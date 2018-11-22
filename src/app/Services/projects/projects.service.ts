import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
	constructor(private http: HttpClient) { }

	getProjects() {
		return this.http.get<any>(`/Projects`).pipe(map(response => {
			return response.records;
		}));
	}
}
