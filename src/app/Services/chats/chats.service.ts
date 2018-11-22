import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ChatsService {
	constructor(private http: HttpClient) { }

	getMessages(id, page, timestamp) {
		return this.http.get<any>(`/Messages/${id}/${page}/${timestamp}`).pipe(map(response => {
			return response;
		}));
	}

	getNewMessages(id, timestamp) {
		return this.http.get<any>(`/Messages/${id}/${timestamp}`).pipe(map(response => {
			return response;
		}));
	}

	sendMessage(body, file = null) {
		if (file) {
			body.file = file;
		}
		return this.http.post<any>(`/Messages`, body).pipe(map(response => {
			return response;
		}));
	}

	getChatName(id) {
		return this.http.get<any>(`/Messages/${id}/GetChatName`).pipe(map(response => {
			return response.records;
		}));
	}
}
