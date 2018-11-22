import {Component, OnDestroy} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent implements OnDestroy {
	public url;
	private sub;

	constructor(private router: Router) {
		this.sub = this.router.events.subscribe((val) => {
			if (val instanceof NavigationEnd) {
				this.url = val.url;
			}
		});
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}
