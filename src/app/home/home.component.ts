import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	users: User[] = [];
	isLogged: boolean;
	user: User;

	constructor(
		private userService: UserService, 
		private router: Router) { }

  	ngOnInit() {

		this.userService.getAll()
			.pipe(first())
			.subscribe(users => {
				this.users = users.dataset.user;
		});
		
		this.userService.getUserLogged()
			.pipe(first())
			.subscribe(user => {
				if (user.message.type == "S") {
					this.user = user.dataset.user;
					this.isLogged = true;
				} else {
					this.isLogged = false;
					this.router.navigate(["/login"])
				}
			});
		
  	}
}
