import { Component, OnInit } from '@angular/core';

import { Car } from "../_models/car";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

	car: Car;
	carForm: FormGroup;
	loading = '';
	error = '';

	constructor() { }

	ngOnInit() {
		this.carForm = new FormGroup({
			board: new FormControl(null, [Validators.required, Validators.maxLength(6)]),
			model: new FormControl(null, [Validators.required]),
			manufacturer: new FormControl(null, [Validators.required]),
			color: new FormControl(null, [Validators.required]),
			year_manufacture: new FormControl(null, [Validators.required]),
			capacity: new FormControl(null, [Validators.required, Validators.maxLength(3)]),
		});
	}

	onSubmit() {

	}

	get f() {
		return this.carForm.controls;
	}

}
