import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Helper } from '../_helpers/helper';
import { SupplyService } from '../_services/supply.service';

@Component({
  selector: 'app-supply',
  templateUrl: './supply.component.html',
  styleUrls: ['./supply.component.css'],
})
export class SupplyComponent implements OnInit {

	supplyForm: FormGroup;
	message = '';
	date = new Date();
	loading = false;

	constructor(
		private route: ActivatedRoute, 
		private supplyService: SupplyService, 
		private helper: Helper) { }

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
		this.loading = false;
	}

	// convenience getter for easy access to form fields
	get f() {
		return this.supplyForm.controls;
	}

	insertValueAuto(liters, amount, price) {

		/* if (liters != "" || amount != "" || price != "") {
			return;
		} */

		let valueCalc = 0.00;

		if (liters == "" && amount != "" && price != "") {
			valueCalc = amount / price;
			this.supplyForm.get('liters').setValue(valueCalc.toFixed(2));
		} else if (amount == "" && liters != "" && price != "") {
			valueCalc = liters * price;
			this.supplyForm.get('amount').setValue(valueCalc.toFixed(2));
		} else if (price == "" && amount != "" && liters != "") {
			valueCalc = amount / liters;
			this.supplyForm.get('price').setValue(valueCalc.toFixed(2));
		} else {
			return;
		}
	}

	saveSuply() {
		const carID = +this.route.snapshot.paramMap.get('id');
		
		this.supplyService.saveSupply(this.supplyForm, carID)
			.subscribe(
				supply => {
					this.helper.openSnackBar(supply.message.text, supply.message.type)
					if (supply.message.type == "S") {
						this.resetValuesForm();
					}
				}, error => {
					this.helper.openSnackBar("Error to save new supply, why: " + error, "ERROR")
					console.error(error)
				}
			);
	}

	private resetValuesForm(): void {
		this.supplyForm.get('liters').setValue('');
		this.supplyForm.get('amount').setValue('');
		this.supplyForm.get('price').setValue('');
		this.supplyForm.get('type').setValue('');
		this.supplyForm.get('dateSupply').setValue('');
	}
}