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
		this.userService.getUserLogged().subscribe(data => {
			if(data.message.type == "S") {
				this.isLogged = true;
				this.router.navigate(['/dashboard']);
			} else {
				this.router.navigate(['/login']);
			}
		},
			error => console.log("Error: " + error)
		);	
		
		
	}
}
