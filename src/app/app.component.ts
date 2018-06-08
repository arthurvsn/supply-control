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
	isLogged: boolean;
	returnUrl = '/home';

	constructor(private userService: UserService, 
		private route: ActivatedRoute,
		private router: Router,) { }

	ngOnInit() {
		this.isLogged = this.userService.getIsLogged();
		this.router.navigate([this.returnUrl]);
	}
}
