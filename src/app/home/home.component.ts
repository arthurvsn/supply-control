import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { tap, delay } from 'rxjs/operators';

import { User } from '../_models/user';
import { Car } from "../_models/car";
import { UserService } from '../_services/user.service';
import { CarService } from '../_services/car.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	cars: Car[] = [];
	user: User;
	isLogged: boolean;

	constructor(
		private userService: UserService, 
		private carService: CarService,
		private router: Router) {  }
	
  	ngOnInit() {
		this.getUserLogged();
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
