import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
	export class RegisterService {
	
	urlApi = 'http://localhost:8000/api';

	constructor(private http: HttpClient) { }
	
	saveNewUser(form: FormGroup) {
		
		let objAdress = {
			street: form.get('street').value,
			city: form.get('city').value,
			state: form.get('state').value,
			zip_code: form.get('zipcode').value,
			country: form.get('country').value,
		};

		let objPhone = {
			country_code: form.get('code').value,
			number: form.get('phone').value,
		};

		let body = {
			name: form.get('name').value,
			username: form.get('username').value,
			email: form.get('email').value,
			profile_picture: "teste",
			password: form.get('password').value,
			user_type: "ARTIST",
			addresses: [
				objAdress
			],
			phones: [
				objPhone
			]
		};
		
		return this.http.post(this.urlApi + '/register', body)
			.map((response: any) => {
				if( response.message.type == "S") {
					return true;
				} else {
					return false;
				}
			}
		);
	}
}
