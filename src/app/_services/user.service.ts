import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from '../_models/user';

@Injectable()

export class UserService {
    
    urlApi = 'http://localhost:8000/api';
    isLogged = false;
    user: User;
    
    constructor(private http: HttpClient) { }
    
    getAll() {
        return this.http.get<any>(this.urlApi + '/user');
    }

    login(username: string, password: string) {
        return this.http.post<any>(this.urlApi + '/login', { username: username, password: password })
            .pipe(map((res: any) => {

                // login successful if there's a jwt token in the response
                if (res.message.type == "S") {
                    this.isLogged = true;
                    let token = res.dataset.token;
                    let username = res.dataset.user.username;
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                }

                return res;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    getIsLogged() {
        if(localStorage.getItem('currentUser') != null) {
            return true;
        } else {
            return false;
        }
    }

    getUserLogged() {
        if (localStorage.getItem('currentUser')) {
            let user = JSON.parse(localStorage.getItem("currentUser"));

            var headers = new HttpHeaders().set('token', user.token);
            //headers.append('token', user.token);
            var options = {
                headers: headers
            };

            return this.http.get<any>(this.urlApi + '/getAuthUser', options);
            
        }
    }
}