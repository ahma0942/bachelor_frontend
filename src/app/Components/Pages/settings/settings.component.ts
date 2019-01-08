import {Component, Injector, OnInit} from '@angular/core';
import {Router, Routes} from '@angular/router';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
	public routes: Routes;

	constructor(private injector: Injector, private router: Router) {
		this.routes = injector.get('Routes');
	}

	ngOnInit() {
	}

	redirect(path) {
		this.router.navigate([path]);
	}
}
