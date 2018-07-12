import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/RX';
import { FormGroup } from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import 'rxjs/RX';

import { AuthenticationService } from '../_services/authentication.service';
import { Service } from '../_services/service';
import { User } from '../_models/user';
import { Router } from '../../../node_modules/@angular/router';
import { Helper } from '../_helpers/helper';

@Injectable()

export class UserService {
    
    urlApi = 'http://localhost:8000/api/';
    url = 'user/';
    isLogged = false;
    user: User;
    token: any;
    
    constructor(private http: HttpClient,
                private authenticationService: AuthenticationService,
                private service: Service,
                private router: Router,
                private helper: Helper) {
        this.token = this.authenticationService.getToken();
    }

    getAddress(zipcode: string): Observable<any> {
        return this.http.get<any>(`https://viacep.com.br/ws/${zipcode}/json/`);
    }

    validateToken(): any {

        if (!this.token) { 
            return false;
        }

        return this.service.ping(this.token);
    }

    changePassword(form: FormGroup): any {

        let newUrl = 'password/change'
        let body = {
            email: form.get('email').value
        };

        return this.service.post(newUrl, body, '');
    }

    resetPassword(form: FormGroup, token: string): any {

        let newUrl = 'password/reset/' + token;
        let body = {
            password: form.get('password').value
        };

        return this.service.post(newUrl, body, '');
    }

    saveProfilePicture(id: number, formData: any): any {
        
        let newUrl = this.url + 'update/picture/' + id;

        return this.service.post(newUrl, formData, this.token);
    
    }

    getUserLogged(): any {

        if (localStorage.getItem('currentUser')) {
            let user = JSON.parse(localStorage.getItem("currentUser"));
            
            let token = !this.helper.isTokenExpired(user.token) ? user.token : "";
            
            if(token) {
                this.user = user.user;
                return this.user;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    getUser(id: number) {

        let url = this.url + id;

        return this.service.get(url, this.token);
    }

    storeUser(form: FormGroup) {

        let url = 'register';

        let body = this.createBodyUser(form);

        return this.service.post(url, body, '');
        
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

    private createBodyUser(form: FormGroup) {

        let objAdress = {
            street: form.get('street').value,
            city: form.get('city').value,
            state: form.get('state').value,
            zip_code: form.get('zipcode').value,
            country: form.get('country').value,
            number: form.get('number').value,
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
            addresses: [
                objAdress
            ],
            phones: [
                objPhone
            ]
        };

        return body;
    }
}