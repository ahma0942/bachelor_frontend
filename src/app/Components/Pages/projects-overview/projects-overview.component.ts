import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
	selector: 'app-prjects-overview',
	templateUrl: './projects-overview.component.html',
	styleUrls: ['./projects-overview.component.css']
})
export class ProjectsOverviewComponent {
	constructor(public route: ActivatedRoute, public router: Router) { }

	redirect(path) {
		this.router.navigate([path]);
	}
}
