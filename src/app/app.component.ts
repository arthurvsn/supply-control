import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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

	constructor(private userService: UserService, 
		private route: ActivatedRoute,
		private router: Router,) { }

	ngOnInit() {
		
		if (this.userService.getUserLogged()) {
			this.isLogged = true;
			this.returnUrl = '/dashboard';
		} else {
			this.isLogged = false;
			this.returnUrl = '/login';
		}
		this.router.navigate([this.returnUrl]);		
	}

	logout() {
		this.router.navigate(['login']);
	}
}
