import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import Project from '@models/project';
import User from '@models/user';
import Response from '@models/response';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
	constructor(private http: HttpClient) { }

	getProjects() {
		return this.http.get<Project[]>(`/Admin/Projects`).pipe(map(response => {
			return response;
		}));
	}

	addProject(name: string, admin: number) {
		return this.http.post<any>(`/Admin/Projects`, { name: name, admin: admin }).pipe(map(response => {
			return response;
		}));
	}

	deleteProject(id: number) {
		return this.http.delete<any>(`/Admin/Projects/${id}`).pipe(map(response => {
			return response;
		}));
	}

	updateProject(project: Project) {
		return this.http.put<any>(`/Admin/Projects/${project.id}`, {
			name: project.name,
			admin: project.admin.id
		}).pipe(map(response => {
			return response;
		}));
	}

	getAllUsersNamesAndIds() {
		return this.http.get<Response<User[]>>(`/Admin/UsersNames`).pipe(map(response => {
			return response.records;
		}));
	}

	getUsers() {
		return this.http.get<Response<User[]>>(`/Admin/Users`).pipe(map(response => {
			return response.records;
		}));
	}

	getUserProjects(id) {
		return this.http.get<Response<any>>(`/Admin/Users/${id}/Projects`).pipe(map(response => {
			return response.records;
		}));
	}

	removeProjectFromUser(userid, projectid) {
		return this.http.delete(`/Admin/Users/${userid}/Projects/${projectid}`).pipe(map(response => {
			return response;
		}));
	}

	addProjectToUser(userid, projectid) {
		return this.http.post(`/Admin/Users/${userid}/Projects/${projectid}`, {}).pipe(map(response => {
			return response;
		}));
	}

	addUser(user: User) {
		return this.http.post<any>(`/Admin/Users`, {
			name: user.name,
			email: user.email,
			role_id: user.role_id,
		}).pipe(map(response => {
			return response;
		}));
	}

	deleteUser(id: number) {
		return this.http.delete<any>(`/Admin/Users/${id}`).pipe(map(response => {
			return response;
		}));
	}

	updateUser(user: User) {
		return this.http.put<any>(`/Admin/Users/${user.id}`, {
			name: user.name,
			email: user.email,
			role_id: user.role_id,
		}).pipe(map(response => {
			return response;
		}));
	}
}
