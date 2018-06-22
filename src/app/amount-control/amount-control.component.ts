import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { SupplyService } from '../_services/supply.service';

@Component({
  selector: 'app-amount-control',
  templateUrl: './amount-control.component.html',
  styleUrls: ['./amount-control.component.css']
})
export class AmountControlComponent implements OnInit {

	amountForm: FormGroup;
	date = new Date();
	
	constructor(private supplyService: SupplyService, private datePipe: DatePipe) { }

	ngOnInit() {		
		this.amountForm = new FormGroup({
			dateSupplyStart: new FormControl({ value: this.date, disabled: true }, [Validators.required]),
			dateSupplyEnd: new FormControl({ value: this.date, disabled: true }, [Validators.required])
		});
	}

	amounthSupplyDate() {
		let date_supply = this.datePipe.transform(this.amountForm.get('dateSupply').value, "yyyy-MM-dd");
	}

}
