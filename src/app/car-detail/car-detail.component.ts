import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Car } from '../_models/car';
import { CarService } from '../_services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})

export class CarDetailComponent implements OnInit {

	car: Car;
	error = '';

	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private carService: CarService
	) { }

	ngOnInit() {
		this.getDetailCar();
	}

	goBack(): void {
		this.location.back();
	}

	toFuel(): void {
		alert("To fuel " + this.car.model);
	}

	getDetailCar(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		
		this.carService.getCar(id)
			.subscribe(
				data => {
					if (data.message.type == "S") {
						this.car = data.dataset.car;
					} else {
						this.error = data.message.text;
					}
				}, error => {
					console.error(error),
					this.error = error
				}
			);
	}

}
