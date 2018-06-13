import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
	export class RegisterService {
	
	urlApi = 'http://localhost:8000/api';

	constructor(private http: HttpClient) { }
	  
	getAddress(zipcode: string){
		return this.http.get<any>('http://viacep.com.br/ws/'+zipcode+'/json/');			
	}

	saveNewUser(form: any) {
		
		let objAdress = {
			street: form.street.value,
			city: form.city.value,
			state: form.state.value,
			zip_code: form.zipcode.value,
			country: form.country.value,
		};

		let objPhone = {
			country_code: form.code.value,
			number: form.phone.value,
		};

		let body = {
			name: form.name.value,
			username: form.username.value,
			email: form.email.value,
			profile_picture: "teste",
			password: form.password.value,
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
		});
	}
}
