import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
	@ViewChild('capture') capture: ElementRef;
	public profile: Profile = {};
	public avatar = null;
	public url = environment.URL;
	private ls = JSON.parse(localStorage.getItem('user'));

	constructor(private profileService: ProfileService, private alertService: AlertService) { }

	ngOnInit() {
		this.profile.avatar = this.ls.avatar;
		this.profile.name = this.ls.name;
		this.profile.email = this.ls.email;
		this.profile.phone = this.ls.phone;
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
				this.capture.nativeElement.value = '';
				this.avatar = '';

				this.ls.avatar = data.avatar ? data.avatar : this.ls.avatar;
				this.ls.name = data.name ? data.name : this.ls.name;
				this.ls.email = data.email ? data.email : this.ls.email;
				this.ls.phone = data.phone ? data.phone : this.ls.phone;
				localStorage.setItem('user', JSON.stringify(this.ls));
			},
			error => {
				this.error('An error occoured while trying to update the profile');
			}
		);
	}
}
