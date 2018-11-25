import {Component, OnInit} from '@angular/core';
import { Injector } from '@angular/core';
import {filter} from 'rxjs/operators';
import {ActivatedRoute, NavigationEnd, Router, Routes} from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	routes: Routes;

	constructor(private injector: Injector, private route: ActivatedRoute, private router: Router) { }

	ngOnInit() {
		this.routes = this.injector.get('Routes');

		this.router.events.pipe(filter(event => event instanceof NavigationEnd)).forEach(e => {
			if (!localStorage.getItem('user') && this.route.root.firstChild.snapshot.data.logged) {
				this.router.navigate(['/Login']);
			} else if (localStorage.getItem('user') && (!this.route.root.firstChild.snapshot.data.logged || this.router.url === '/User')) {
				this.router.navigate(['/User/Projects']);
			}
		});
	}
}
