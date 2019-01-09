import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthenticationService} from '@services/authentication/authentication.service';
import {first} from 'rxjs/operators';
import {AlertService} from '@services/alert/alert.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})

export class LoginComponent {
	loginForm = this.fb.group({
		email: ['', Validators.compose([Validators.required, Validators.email])],
		password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.max(64)])],
	});

	constructor(private fb: FormBuilder, private authService: AuthenticationService, private alertService: AlertService) { }

	success(msg: string) {
		this.alertService.success(msg);
	}

	error(msg: string) {
		this.alertService.error(msg);
	}

	login() {
		this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value).pipe(first()).subscribe(
			data => {
				console.log('success');
			},
			error => {
				this.error('Wrong username & password combination');
			}
		);
	}
}
