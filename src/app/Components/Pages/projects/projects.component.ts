import { Component, OnInit } from '@angular/core';
import {first} from 'rxjs/operators';
import {ProjectsService} from '@services/projects/projects.service';
import {Router} from '@angular/router';
import {environment} from '@env/environment';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
	public projects = [];
	public url = environment.URL;

	constructor(private projectsService: ProjectsService, private router: Router) { }

	ngOnInit() {
		this.projectsService.getProjects().pipe(first()).subscribe(
			data => {
				console.log('success');
				this.projects = data;
			},
			error => {
				console.log('failure');
			}
		);
	}

	redirect(path) {
		this.router.navigate([path]);
	}
}
