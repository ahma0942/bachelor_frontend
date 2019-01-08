import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent {
	@Input() title: string;
	@Input() back: string;
	@Input() icon: string;
	@Input() next: string;

	constructor(private router: Router) { }

	redirect(redir) {
		this.router.navigate([redir]);
	}
}
