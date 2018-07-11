import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../_services/user.service';
import { CarService } from '../_services/car.service';
import { User } from '../_models/user';
import { Car } from "../_models/car";
import { Helper } from '../_helpers/helper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	cars: Car[] = [];
	//picture = "https://material.angular.io/assets/img/examples/shiba1.jpg";
	picture = "assets/images/flat-avatar.png";
	user: User;
	isLogged: boolean;
	/*ng g c new-component --module app*/
	constructor(
		private userService: UserService, 
		private carService: CarService,
		private router: Router,
		private helper: Helper) {  }
	
  	ngOnInit() {
		this.getUserLogged();
		this.getCars();
	}

	getUserLogged(): void {		
		
		this.user = this.userService.getUserLogged();
		
		if (this.user.profile_picture) {
			this.picture = this.user.profile_picture;
		}
	}

	getCars(): void {
		this.carService.getAllCarsByUser(this.user.id)
			.subscribe(
				cars => {
					if(cars.message.type == "S") {
						this.cars = cars.dataset.cars;
					}
				}, error => {
					console.error(error)
					this.helper.openSnackBar(error.message, "ERROR")
				}
			);
	}
	
	getInfoCar(id: number) {
		alert(id);
	}
}
