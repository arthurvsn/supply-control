import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { tap, delay } from 'rxjs/operators';

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
		private router: Router) {  }
	
  	ngOnInit() {
		this.getUserLogged();
	}
	  
	getUserLogged(): void {
		
		this.user = this.userService.getUserLogged();
	}

	getInfoCar(id: number) {
		alert(id);
	}
}
