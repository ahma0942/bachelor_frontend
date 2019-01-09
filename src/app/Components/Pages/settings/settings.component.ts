import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AuthenticationService} from '@services/authentication/authentication.service';
import {AlertService} from '@services/alert/alert.service';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
	changePasswordForm = this.fb.group({
		oldpass: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.max(64)])],
		newpass: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.max(64)])],
		confpass: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.max(64)])],
	});

	constructor(private fb: FormBuilder,
				private authService: AuthenticationService,
				private router: Router,
				private alertService: AlertService) {}

	changePassword() {
		this.authService.changePassword(
			this.changePasswordForm.get('oldpass').value,
			this.changePasswordForm.get('newpass').value,
			this.changePasswordForm.get('confpass').value).pipe(first()).subscribe(
			data => {
				this.success('Password changed successfully');
			},
			error => {
				this.error('Could not change your password. Make sure you old password is correct.');
			}
		);
	}

	success(msg: string) {
		this.alertService.success(msg);
	}

	error(msg: string) {
		this.alertService.error(msg);
	}

	redirect(path) {
		this.router.navigate([path]);
	}
}
