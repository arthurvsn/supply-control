import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../_services/user.service';
import { CarService } from '../_services/car.service';
import { User } from '../_models/user';
import { Car } from "../_models/car";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	cars: Car[] = [];
	user: User;
	isLogged: boolean;
	/*ng g c new-component --module app*/
	constructor(
		private userService: UserService, 
		private carService: CarService,
		private router: Router) {  }
	
  	ngOnInit() {
		this.getUserLogged();
		this.getCars();
	}
	  
	getUserLogged(): void {		
		this.user = this.userService.getUserLogged();
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
				}
			);
	}
	
	getInfoCar(id: number) {
		alert(id);
	}
}
