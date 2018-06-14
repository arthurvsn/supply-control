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

@Injectable()

export class UserService {
    
    urlApi = 'http://localhost:8000/api/';
    isLogged = false;
    user: User;
    token: any;
    headers = new HttpHeaders().set('token', this.token );
    options = { headers: this.headers };
    
    constructor(private http: HttpClient, authenticationService: AuthenticationService) {
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

    getInfoUser(id: number): any {
        alert(id);
        return this.http.get<any>(this.urlApi + 'user/' + id)
            .map((response : Response) => {
                console.log(response)
            }) 
    }

    getUser(id: number): Observable<any> {
        
        let headers = new HttpHeaders().set('token', this.token);
        let options = { headers: headers };
        const url = `${this.urlApi}user/${id}`;

        return this.http.get<any>(url, options)
            .pipe(
                tap(_ => this.log(`fetched supply id=${id}`)),
                catchError(this.handleError<any>(`getSupply id=${id}`))
            );
    }
    
    getUser1(id: number) {
        let headers = new HttpHeaders().set('token', this.token);
        let options = { headers: headers };
        let url = `${this.urlApi}user/${id}`;

        let promise = new Promise((resolve, reject) => {
            this.http.get(url, options)
                .toPromise()
                .then(
                    res => {
                        //this.results = res.json().results;
                        resolve(res);
                    },
                    msg => {
                        reject(msg);
                    }
                );
        });
        return promise;

        /* console.log("GET AS PROMISE");
       
        this.http.get(url, options)
            .toPromise()
            .then(res => {
                res;
            }); */
    }

    /* private handleError(error: any) {
        let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    } */

    private log(message: string) {
       console.log('UserService: ' + message);
    }

	/**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}