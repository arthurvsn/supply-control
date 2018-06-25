import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CarService } from '../_services/car.service';
import { UserService } from '../_services/user.service';
import { Car } from "../_models/car";
import { User } from '../_models/user';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

	user: User;
	car: Car;
	carForm: FormGroup;
	error = '';
	submitted = false;
	loading = false;

	constructor(private carService: CarService, private userService: UserService, private router: Router) { }

	ngOnInit() {
		this.carForm = new FormGroup({
			board: new FormControl(null, [Validators.required, Validators.maxLength(7)]),
			model: new FormControl(null, [Validators.required]),
			manufacturer: new FormControl(null, [Validators.required]),
			color: new FormControl(null, [Validators.required]),
			year_manufacture: new FormControl(null, [Validators.required]),
			capacity: new FormControl(null, [Validators.required, Validators.maxLength(3)]),
		});

		this.user = this.userService.getUserLogged();
	}

	onSubmit() {

		this.submitted = true;
		// stop here if form is invalid
		if (this.carForm.invalid) {
			return;
		}
		return;
		this.loading = true;
		this.carService.storeCar(this.user.id, this.carForm)
			.subscribe(
				data => {
					if (data.message.type == "S") {
						this.router.navigate(['/dashboard']);
					} else {
						this.error = "Erro to save new car and " + data.message.type;
						this.loading = false;
					}
				}, error => {
					console.error(error);					
					this.error = error;
				}
			);
	}

	get f() {
		return this.carForm.controls;
	}

}
