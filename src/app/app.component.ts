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
	returnUrl = '/home';

	constructor(private userService: UserService, 
		private route: ActivatedRoute,
		private router: Router,) { }

	ngOnInit() {
		this.userService.getUserLogged().subscribe(data => {
			this.isLogged = data.message.type == "S" ? true : false
		},
			error => console.log(error)
		);
		this.router.navigate([this.returnUrl]);
	}
}
