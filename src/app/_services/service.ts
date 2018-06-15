import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import 'rxjs/RX';

@Injectable()

export class Service {

    urlApi = 'http://localhost:8000/api/';
    token: any;

    constructor(private http: HttpClient) {   }

    get(url: string, token: any): Observable<any> {

        let options = this.createHeader(token);

        let newUrl = this.urlApi + url;

        return this.http.get<any>(newUrl, options)
            .pipe(
                tap(_ => this.log(`fetched supply url = ${newUrl}`)),
                catchError(this.handleError<any>(`getSupply url=${newUrl}`))
            );
        
    }

    post(url: string, body: any, token:any): Observable<any> {

        let options = this.createHeader(token);

        let newUrl = this.urlApi + url;

        return this.http.post<any>(newUrl, body, options)
            .pipe(
                tap(_ => this.log(`Post url = ${newUrl}`)),
                catchError(this.handleError<any>(`Error POST url=${newUrl}`))
            );
    }

    update(url: string, body: any, token: any): Observable<any> {
        let options = this.createHeader(token);

        let newUrl = this.urlApi + url;

        return this.http.put<any>(newUrl, body, options)
            .pipe(
                tap(_ => this.log(`PUT url = ${newUrl}`)),
                catchError(this.handleError<any>(`Error PUT url=${newUrl}`))
            );
    }

    private createHeader(token: string) {

        let headers = new HttpHeaders().set('token', token);
        let options = { headers: headers };

        return options;
    }

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