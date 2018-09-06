import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { SupplyService } from "../_services/supply.service";
import { TypeFuel } from "../_models/typeFuel";
import { Helper } from "../_helpers/helper";

@Component({
	selector: 'app-compare-supply',
	templateUrl: './compare-supply.component.html',
	styleUrls: ['./compare-supply.component.css']
})
export class CompareSupplyComponent implements OnInit {

	constructor(
		private supplyService: SupplyService,
		private helper: Helper
	) { }

	typeFuels: TypeFuel[] = [];
	compareForm: FormGroup;
	valueTotal: number;
	typeFuel1: string;
	typeFuel2: string;

	ngOnInit() {

		this.getTypeFuel();

		this.compareForm = new FormGroup({
			type1: new FormControl(),
			price1: new FormControl(),
			type2: new FormControl(),
			price2: new FormControl(),
		});
	}

	getTypeFuel() {
		this.supplyService.getTypeFuels()
			.subscribe(
				typeFuel => {
					if (typeFuel.message.type == "S") {
						this.typeFuels = typeFuel.dataset.typeFuels;
					}
				}, error => {
					console.error(error)
					this.helper.openSnackBar(error.message, "ERROR")
				}
			);
	}

	compare() {
		let price1 = this.compareForm.get('price1').value;
		let price2 = this.compareForm.get('price2').value;

		this.typeFuel1 = this.compareForm.get('type1').value;
		this.typeFuel2 = this.compareForm.get('type2').value;

		let value = (price2 * 100) / price1;

		this.valueTotal = Math.round(value * 100) / 100;
	}
}
