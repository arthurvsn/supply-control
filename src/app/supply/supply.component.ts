import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SupplyService } from '../_services/supply.service';

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

	constructor(private route: ActivatedRoute, private supplyService: SupplyService) { }

	ngOnInit() {
		this.supplyForm = new FormGroup({
			liters: new FormControl(null, [Validators.required]),
			amount: new FormControl(null, [Validators.required]),
			price: new FormControl(null, [Validators.required]),
			type: new FormControl(null, [Validators.required]),
			dateSupply: new FormControl({ value: this.date, disabled: true }, [Validators.required]),
		});
	}

	onSubmit() {
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
					if (supply.message.type == "S") {
						this.message = supply.message.text;
					} else {
						this.error = supply.message.text;						
					}
				}, error => {
					console.error(error)
					this.message = "Error to save new supply, why: " + error;
				}
			);
	}
}
