import { Component } from '@angular/core';
import { Router } from '@angular/router';
import 'hammerjs';

import { UserService } from './_services/user.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	title = 'Supply Control';
	isLogged: any;
	returnUrl = '/';
	href: string;

	constructor(
		private userService: UserService,
		private router: Router) { }

	ngOnInit() {
		if (this.userService.getUserLogged()) {
			this.isLogged = true;
		} else {
			this.isLogged = false;
		}
	}

	logout() {
		this.router.navigate(['/login']);
		window.location.reload();
	}
}
