import { Component, OnInit } from '@angular/core';
import {first} from 'rxjs/operators';
import {AdminService} from '@services/admin/admin.service';
import Project from '@models/project';
import {FormBuilder, Validators} from '@angular/forms';
import User from '@models/user';

@Component({
	selector: 'app-admin-project',
	templateUrl: './admin-project.component.html',
	styleUrls: ['./admin-project.component.css']
})
export class AdminProjectComponent implements OnInit {
	addProjectForm = this.fb.group({
		name: ['', Validators.compose([Validators.required])],
		admin: ['', Validators.compose([Validators.required])],
	});
	public projects: Project[] = [];
	public users: User[] = [];

	constructor(private fb: FormBuilder, private adminService: AdminService) { }

	ngOnInit() {
		this.adminService.getProjects().pipe(first()).subscribe(
			data => {
				console.log('success');
				this.projects = data;
			},
			error => {
				console.log('failure');
			}
		);

		this.adminService.getAllUsersNamesAndIds().pipe(first()).subscribe(
			data => {
				console.log('success');
				this.users = data;
			},
			error => {
				console.log('failure');
			}
		);
	}

	addProject() {
		this.adminService.addProject(this.addProjectForm.get('name').value, this.addProjectForm.get('admin').value).pipe(first()).subscribe(
			data => {
				console.log('success');
				this.projects.push({
					id: data,
					name: this.addProjectForm.get('name').value,
					admin: {id: this.addProjectForm.get('admin').value},
					timestamp: Math.floor(Date.now() / 1000),
				});
				this.addProjectForm.reset();
			},
			error => {
				console.log('failure');
			}
		);
	}

	deleteProject(index: number) {
		this.adminService.deleteProject(this.projects[index].id).pipe(first()).subscribe(
			data => {
				console.log('success');
				this.projects.splice(index, 1);
			},
			error => {
				console.log('failure');
			}
		);
	}

	updateProject(index: number) {
		this.adminService.updateProject(this.projects[index]).pipe(first()).subscribe(
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
}
