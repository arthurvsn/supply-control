import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Helper } from '../_helpers/helper';
import { CarService } from '../_services/car.service';
import { Car } from '../_models/car';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})

export class CarDetailComponent implements OnInit {

	car: Car;
	errorCar = true;
	model = '';
	manufacturer = '';
	
	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private carService: CarService,
		private helper: Helper,
	) { }

	ngOnInit() {
		const id = +this.route.snapshot.paramMap.get('id');
		this.getDetailCar(id);
	}
	
	goBack(): void {
		this.location.back();
	}

	getDetailCar(id: number): void {
		this.carService.getCar(id)
			.subscribe(
				data => {
					if (data.message.type == "S") {
						this.car = data.dataset.car;
						this.model = this.car.model;
						this.manufacturer = this.car.manufacturer;
						this.errorCar = false;
					} else {						
						this.helper.openSnackBar(data.message.text, data.message.type);
					}
				}, error => {
					console.error(error),
					this.helper.openSnackBar(error.message, "ERROR");
				}
			);
	}
}
