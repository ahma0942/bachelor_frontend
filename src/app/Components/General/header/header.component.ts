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

	constructor(private router: Router) { }

	redirect() {
		this.router.navigate([this.back]);
	}
}