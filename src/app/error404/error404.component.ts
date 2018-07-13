import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
	selector: 'app-error404',
	templateUrl: './error404.component.html',
	styleUrls: ['./error404.component.css']
})
export class Error404Component implements OnInit {

	path = this.location.path();

	constructor(
		private location: Location,
	) { }

	ngOnInit() {
	}

	back(): void {
		this.location.back();
	}

}
