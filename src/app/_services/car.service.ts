import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Service } from '../_services/service';
import { Car } from '../_models/car';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {

	car: Car;
	token: string;
	url = 'car/';

	constructor(private service: Service, authenticationService: AuthenticationService) { 
		this.token = authenticationService.getToken();
	}

	getAllCarsByUser(userID: number) {
		
		let url = this.url + 'user/' + userID;

		return this.service.get(url, this.token);
	}

	storeCar(userID: number, form: FormGroup) {

		let url = this.url;

		let body = this.createBodyCar(userID, form);

		return this.service.post(url, body, this.token);
	}

	getCar(id: number) {

		let url = this.url + id;

		return this.service.get(url, this.token);
	}

	updateCar(id: number, idUser: number, form: FormGroup) {
		
		let url = this.url + id;

		let body = this.createBodyCar(idUser, form);

		return this.service.update(url, body, this.token);
	}

	deleteCar(id: number) {

		let url = this.url + id;

		return this.service.delete(url, this.token);
	}

	private createBodyCar(userId: number, form: FormGroup) {
		
		let bodyCar = {
			board: form.get('board').value,
			model: form.get('model').value,
			manufacturer: form.get('manufacturer').value,
			color: form.get('color').value,
			year_manufacture: form.get('year_manufacture').value,
			capacity: form.get('capacity').value,
			user_id: userId,
		}

		return bodyCar;
	}
}
