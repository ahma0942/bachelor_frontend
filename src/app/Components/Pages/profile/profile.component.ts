import { Component, OnInit } from '@angular/core';
import {first} from "rxjs/operators";
import {ProfileService} from "@services/profile/profile.service";

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	constructor(private profileService: ProfileService) { }

	ngOnInit() {
		this.profileService.getProfile().pipe(first()).subscribe(
			data => {
				console.log('success');
			},
			error => {
				console.log('failure');
			}
		);
	}
}
