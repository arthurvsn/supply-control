import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { Service } from '../_services/service';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SupplyService {

	token: string;
	url = "supply"

	constructor(private service: Service, authenticationService: AuthenticationService, private datePipe: DatePipe) {
		this.token = authenticationService.getToken();
	}

	saveSupply(form: FormGroup, carID: number) {

		let body = this.bodyNewSupply(form, carID);

		return this.service.post(this.url, body, this.token);
	}

	getAmountSupply(dateFilterStar: string, dateFilterEnd: string, carID: number) {

		let newUrl = this.url + '/' + dateFilterStar + '/' + dateFilterEnd + '/' + carID;

		return this.service.get(newUrl, this.token);
	}

	private bodyNewSupply(form: FormGroup, carID: number) {

		let body = {
			liters: form.get('liters').value,
			amount: form.get('amount').value,
			fuel_price: form.get('price').value,
			type: form.get('type').value,
			date_supply: this.datePipe.transform(form.get('dateSupply').value, "yyyy-MM-dd"),
			car_id: carID
		}

		return body;
	}
}
