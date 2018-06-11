import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable()

export class UserService {
    
    urlApi = 'http://localhost:8000/api';
    isLogged = false;
    user: User;
    token: any;
    private headers = new Headers({ 'Content-Type': 'application/json', 'token': this.token });
    private options = new RequestOptions({ headers: this.headers });
    
    constructor(private http: HttpClient, 
                authenticationService: AuthenticationService) {
                    this.token = authenticationService.getToken();
                }
    
    getAll() {
        return this.http.get<any>(this.urlApi + '/user');
    }

    getUserLogged(): Observable<any> {
        
        var headers = new HttpHeaders().set('token', this.token);
        //headers.append('token', user.token);
        var options = {
            headers: headers
        };
        console.log(this.token);
        return this.http.get<any>(this.urlApi + '/getAuthUser', options)
        //return this.http.get<any>(this.urlApi + '/getAuthUser', this.options)
            .map((response: any) => {
                return response;
            }).catch(this.handleError);
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}