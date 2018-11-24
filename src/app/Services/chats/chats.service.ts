import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import Message from '@models/message';
import Record from '@models/record';
import {Observable} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ChatsService {
	constructor(private http: HttpClient) { }

	getMessages(id, page, timestamp): Observable<Message[]> {
		return this.http.get<Record<Message[]>>(`/Messages/${id}/${page}/${timestamp}`).pipe(map(response => {
			return response.records;
		}));
	}

	getNewMessages(id, timestamp): Observable<Message[]> {
		return this.http.get<Record<Message[]>>(`/Messages/${id}/${timestamp}`).pipe(map(response => {
			return response.records;
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

	deleteMessage(id) {
		return this.http.delete<any>(`/Messages/${id}`).pipe(map(response => {
			return response;
		}));
	}
}
