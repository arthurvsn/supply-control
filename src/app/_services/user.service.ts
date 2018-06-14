import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import 'rxjs/RX';

import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';
import { Service } from '../_services/service';

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
    
    getAll() {
        return this.http.get<any>(this.urlApi + 'user');
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
}