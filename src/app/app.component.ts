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

	constructor(
		private userService: UserService,
		private router: Router) { }

	ngOnInit() {

		if (this.userService.getUserLogged()) {
			this.userService.validateToken()
				.subscribe(
					ping => {
						if (ping.message.type == "S") {
							this.isLogged = true;
							this.returnUrl = '/dashboard';
							this.router.navigate([this.returnUrl]);
						} else {
							this.isLogged = false;
							this.returnUrl = '/login';
							this.router.navigate([this.returnUrl]);
						}
					}, error => {
						console.error(error);
						this.returnUrl = '/login';
						this.router.navigate([this.returnUrl]);
					}
				);
		} else {
			this.isLogged = false;
			this.returnUrl = '/login';
		}

		this.router.navigate([this.returnUrl]);

		/* if (this.userService.getUserLogged()) {
			this.isLogged = true;
		} else {
			this.isLogged = false;
		} */
	}

	logout() {
		this.router.navigate(['/login']);
		window.location.reload();
	}
}
