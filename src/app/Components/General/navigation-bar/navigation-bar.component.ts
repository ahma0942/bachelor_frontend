import {Component, Injector} from '@angular/core';
import {Router, Routes} from '@angular/router';

@Component({
	selector: 'app-navigation-bar',
	templateUrl: './navigation-bar.component.html',
	styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {
	public currentRoute;
	public routes: Routes;
	public user = JSON.parse(localStorage.getItem('user'));
	public icons = {
		Profile: 'user',
		Projects: 'book',
		Settings: 'cogs',
		Admin: 'user-secret',
	};

	constructor(private injector: Injector, private router: Router) {
		this.routes = injector.get('Routes');
		this.currentRoute = router.url.split('/')[2];
	}

	IsAllowed(data) {
		if (!data) {
			return false;
		}
		if (data.role_id && data.role_id.includes(this.user.role_id)) {
			return true;
		} else if (!data.role_id) {
			return true;
		}
		return false;
	}

	redirect(path) {
		this.currentRoute = path.split('/')[2];
		this.router.navigate([path]);
	}
}
