import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import User from '@models/user';
import {AdminService} from '@services/admin/admin.service';
import {first} from 'rxjs/operators';
import {Roles} from '@models/role';
import {Router} from '@angular/router';

@Component({
	selector: 'app-admin-users',
	templateUrl: './admin-users.component.html',
	styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
	addUserForm = this.fb.group({
		name: ['', Validators.compose([Validators.required])],
		email: ['', Validators.compose([Validators.required, Validators.email])],
		role_id: ['', Validators.compose([Validators.required])],
	});
	public users: User[] = [];
	public roles = [];

	constructor(private fb: FormBuilder, private adminService: AdminService, private router: Router) { }

	ngOnInit() {
		this.adminService.getUsers().pipe(first()).subscribe(
			data => {
				console.log('success');
				this.users = data;
			},
			error => {
				console.log('failure');
			}
		);

		const keys = Object.keys(Roles).filter(k => typeof Roles[k as any] === 'number');
		const values = keys.map(k => Roles[k as any]);
		for (let i = 0; i < keys.length; i++) {
			this.roles.push({
				id: values[i],
				name: keys[i]
			});
		}
	}

	addUser() {
		this.adminService.addUser(this.addUserForm.getRawValue()).pipe(first()).subscribe(
			data => {
				console.log('success');
				this.users.push({
					id: data,
					name: this.addUserForm.get('name').value,
					email: this.addUserForm.get('email').value,
					role_id: this.addUserForm.get('role_id').value
				});
				this.addUserForm.reset();
			},
			error => {
				console.log('failure');
			}
		);
	}

	deleteUser(index: number) {
		this.adminService.deleteUser(this.users[index].id).pipe(first()).subscribe(
			data => {
				console.log('success');
				this.users.splice(index, 1);
			},
			error => {
				console.log('failure');
			}
		);
	}

	updateUser(index: number) {
		this.adminService.updateUser(this.users[index]).pipe(first()).subscribe(
			data => {
				console.log('success');
			},
			error => {
				console.log('failure');
			}
		);
	}

	trackByIndex(index: number, obj: any): any {
		return index;
	}

	redirect(path) {
		this.router.navigate([path]);
	}
}
