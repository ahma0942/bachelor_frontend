import { Component, OnInit } from '@angular/core';
import {first} from 'rxjs/operators';
import {ProfileService} from '@services/profile/profile.service';
import Profile from '@models/profile';
import {AlertService} from '@services/alert/alert.service';
import {environment} from '@env/environment';

class ImageSnippet {
	constructor(public src: string, public file: File) {}
}

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	public profile: Profile = {};
	public avatar = null;
	public url = environment.URL;

	constructor(private profileService: ProfileService, private alertService: AlertService) { }

	ngOnInit() {
		this.profileService.getProfile().pipe(first()).subscribe(
			data => {
				this.profile = data;
			},
			error => {
				console.log('failure');
			}
		);
	}

	uploadFile(imageInput: any) {
		const file: File = imageInput.files[0];
		const reader = new FileReader();

		reader.addEventListener('load', (event: any) => {
			this.avatar = new ImageSnippet(event.target.result, file);
		});
		reader.readAsDataURL(file);
	}

	success(msg: string) {
		this.alertService.success(msg);
	}

	error(msg: string) {
		this.alertService.error(msg);
	}

	saveProfile() {
		this.profileService.saveProfile(this.profile.name, this.profile.email, this.profile.phone, this.avatar).pipe(first()).subscribe(
			data => {
				this.success('Profile Updated');
			},
			error => {
				this.error('An error occoured while trying to update the profile');
			}
		);
	}
}
