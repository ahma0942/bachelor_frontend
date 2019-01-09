import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthenticationService} from '@services/authentication/authentication.service';
import {first} from 'rxjs/operators';

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

	constructor(private fb: FormBuilder, private authService: AuthenticationService) { }

	login() {
		this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value).pipe(first()).subscribe(
			data => {
				console.log('success');
			},
			error => {
				console.log('failure');
			}
		);
	}
}
