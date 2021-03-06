import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
	constructor(private http: HttpClient, private router: Router) { }

	login(email: string, password: string) {
		return this.http.post<any>(`/Login`, { email: email, password: password }).pipe(map(response => {
			localStorage.setItem('user', JSON.stringify(response));
			this.router.navigate(['/User/Projects']);
		}));
	}

	changePassword(oldpass, newpass, confpass) {
		return this.http.put<any>(`/ChangePassword`, { oldpass: oldpass, newpass: newpass, confpass: confpass }).pipe(map(response => {
			return true;
		}));
	}

	logout() {
		localStorage.removeItem('user');
		this.router.navigate(['/Login']);
	}
}
