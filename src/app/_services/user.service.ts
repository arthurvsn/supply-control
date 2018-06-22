import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import 'rxjs/RX';

import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';
import { Service } from '../_services/service';
import { Observable } from 'rxjs/RX';

@Injectable()

export class UserService {
    
    urlApi = 'http://localhost:8000/api/';
    url = 'user/';
    isLogged = false;
    user: User;
    token: any;
    headers = new HttpHeaders().set('token', this.token );
    options = { headers: this.headers };
    
    constructor(private http: HttpClient, authenticationService: AuthenticationService, private service: Service) {
        this.token = authenticationService.getToken();
    }
    
    private createBodyUser(form: FormGroup) {
        
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

        return body;
    }

    getAddress(zipcode: string): Observable<any> {
        return this.http.get<any>(`https://viacep.com.br/ws/${zipcode}/json/`);
    }

    getAll() {
        return this.http.get<any>(this.urlApi + 'user');
    }

    validateToken(): any {
        if (!this.token) { return; }
        return this.service.ping(this.token);
    }

    getUserLogged(): any {
        if (localStorage.getItem('currentUser')) {
            let user = JSON.parse(localStorage.getItem("currentUser"));

            this.user = user.user;

            return this.user;
        } else {
            return false;
        }
    }

    getUser(id: number) {
        let url = this.url + id;
        return this.service.get(url, this.token);
    }

    storeUser(body: any) {
        let url = 'store';
    }

    updateUser(id: number, form: FormGroup) {
        
        let url = this.url + id;

        let body = this.createBodyUser(form);

        return this.service.update(url, body, this.token);
    }

    deleteUser(id: number) {

        let url = this.url + id;

        return this.service.delete(url, this.token);
    }
}