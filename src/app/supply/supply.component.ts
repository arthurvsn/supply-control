import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { SupplyService } from '../_services/supply.service';
import { Helper } from '../_helpers/helper';

@Component({
  selector: 'app-supply',
  templateUrl: './supply.component.html',
  styleUrls: ['./supply.component.css']
})
export class SupplyComponent implements OnInit {

	supplyForm: FormGroup;
	message = '';
	error = '';
	date = new Date();
	loading = false;

	constructor(private route: ActivatedRoute, private supplyService: SupplyService, private helper: Helper) { }

	ngOnInit() {
		this.supplyForm = new FormGroup({
			liters: new FormControl(null, [Validators.required, Validators.pattern("^[0-9-.]*$")]),
			amount: new FormControl(null, [Validators.required, Validators.pattern("^[0-9-.]*$")]),
			price: new FormControl(null, [Validators.required, Validators.pattern("^[0-9-.]*$")]),
			type: new FormControl(null, [Validators.required]),
			dateSupply: new FormControl({ value: this.date, disabled: true }, [Validators.required]),
		});
	}

	onSubmit() {
		this.loading = true;
		this.saveSuply();
	}

	// convenience getter for easy access to form fields
	get f() {
		return this.supplyForm.controls;
	}

	saveSuply() {
		const carID = +this.route.snapshot.paramMap.get('id');
		
		this.supplyService.saveSupply(this.supplyForm, carID)
			.subscribe(
				supply => {
					this.helper.openSnackBar(supply.message.text, supply.message.type)
				}, error => {
					this.helper.openSnackBar("Error to save new supply, why: " + error, "ERROR")
					console.error(error)
				}
			);
	}
}