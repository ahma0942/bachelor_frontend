import { Component, OnInit } from '@angular/core';
import {first} from 'rxjs/operators';
import {SearchService} from '@services/search/search.service';
import {ActivatedRoute} from '@angular/router';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
	public results = [];
	public search = 'a';

	constructor(private searchService: SearchService, private route: ActivatedRoute) { }

	ngOnInit() {
		this.searchMessage();
	}

	searchMessage() {
		this.searchService.search(this.route.snapshot.paramMap.get('id'), this.search).pipe(first()).subscribe(
			data => {
				this.results = data.records;
				console.log('success');
			},
			error => {
				console.log('failure');
			}
		);
	}
}
