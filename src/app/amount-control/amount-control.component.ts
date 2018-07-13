import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { SupplyService } from '../_services/supply.service';
import { Helper } from "../_helpers/helper";

@Component({
  selector: 'app-amount-control',
  templateUrl: './amount-control.component.html',
  styleUrls: ['./amount-control.component.css']
})
export class AmountControlComponent implements OnInit {

	amountForm: FormGroup;
	dateStart = new Date();
	dateEnd = new Date();
	amount = 0.00;
	loading = false;
	
	constructor(
		private supplyService: SupplyService, 
		private helper: Helper, 
		private route: ActivatedRoute) { }

	ngOnInit() {		
		this.amountForm = new FormGroup({
			amount: new FormControl({ value: this.amount, disabled: true }, [Validators.required]),
			dateSupplyStart: new FormControl({ value: this.dateStart, disabled: true }, [Validators.required, Validators.pattern("^[0-9-.]*$")]),
			dateSupplyEnd: new FormControl({ value: this.dateEnd, disabled: true }, [Validators.required, Validators.pattern("^[0-9-.]*$")])
		});
	}

	filterExpenses() {
		this.loading = true;
		let dateSupplyStart = this.helper.formatDate(this.amountForm.get('dateSupplyStart').value);
		let dateSupplyEnd = this.helper.formatDate(this.amountForm.get('dateSupplyEnd').value);

		if (dateSupplyEnd < dateSupplyStart) {
			this.helper.openSnackBar("Final date greater than initial date", "False");
			return;
		}
		let carID = +this.route.snapshot.paramMap.get('id');
		
		this.supplyService.getAmountSupply(dateSupplyStart, dateSupplyEnd, carID)
			.subscribe(
				data => {
					if (data.dataset.supply.valueAmount > 0) {
						this.amountForm.get('amount').setValue(data.dataset.supply.valueAmount);
					} else {
						this.amountForm.get('amount').setValue(0.00);
					}
					this.loading = false;
				}, error => {
					this.helper.openSnackBar(error.message, "ERROR");
					this.loading = false;
				}
			);
	}

}
