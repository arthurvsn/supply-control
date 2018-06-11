import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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

			this.getUserLogged();
	}
	  
	getUserLogged(): void {
		this.userService.getUserLogged()
			.subscribe(data => {
				if (data.message.type == "S") {
					this.user = data.dataset.user;
				}
			},
			error => console.log(error)
		);
	}

	getInfoCar(id: number) {
		alert(id);
	}
}
