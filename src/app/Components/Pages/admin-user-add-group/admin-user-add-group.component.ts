import { Component, OnInit } from '@angular/core';
import {first} from 'rxjs/operators';
import {AdminService} from '@services/admin/admin.service';
import Project from '@models/project';
import {ActivatedRoute} from '@angular/router';

@Component({
	selector: 'app-admin-user-add-group',
	templateUrl: './admin-user-add-group.component.html',
	styleUrls: ['./admin-user-add-group.component.css']
})
export class AdminUserAddGroupComponent implements OnInit {
	public userProjects;
	public projects: Project[];
	public selectedProject;

	constructor(private adminService: AdminService, private route: ActivatedRoute) { }

	ngOnInit() {
		this.GetUserProjects();
	}

	GetUserProjects() {
		this.adminService.getProjects().pipe(first()).subscribe(
			data => {
				this.projects = data;
			},
			error => {
				console.log('failure');
			}
		);

		this.adminService.getUserProjects(this.route.snapshot.paramMap.get('id')).pipe(first()).subscribe(
			data => {
				let i = data.length;
				while (i--) {
					this.projects.filter((e, index) => e.name === data[i].project_id.name ? this.projects.splice(index, 1) : '' );
					if (data[i].project_id.deleted) {
						data.splice(i, 1);
					}
				}
				this.userProjects = data;
			},
			error => {
				console.log('failure');
			}
		);
	}

	removeProject(index) {
		this.adminService.removeProjectFromUser(this.route.snapshot.paramMap.get('id'),
			this.userProjects[index].project_id.id).pipe(first()).subscribe(
			data => {
				console.log('success');
				this.projects.push({id: this.userProjects[index].project_id.id, name: this.userProjects[index].project_id.name });
				this.userProjects.splice(index, 1);
			},
			error => {
				console.log('failure');
			}
		);
	}

	addProject() {
		this.adminService.addProjectToUser(this.route.snapshot.paramMap.get('id'),
			this.projects[this.selectedProject].id).pipe(first()).subscribe(
			data => {
				console.log('success');
				this.userProjects.push({
					project_id: {
						id: this.projects[this.selectedProject].id,
						name: this.projects[this.selectedProject].name,
					}
				});
				this.projects.splice(this.selectedProject, 1);
				this.selectedProject = null;
			},
			error => {
				console.log('failure');
			}
		);
	}
}
