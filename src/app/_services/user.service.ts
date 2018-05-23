import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models/user';

@Injectable()

export class UserService {
    
    urlApi = 'http://localhost:8000/api';
    
    constructor(private http: HttpClient) { }
    
    getAll() {
        return this.http.get<any>(this.urlApi + '/user');
    }

    login(username: string, password: string) {
        return this.http.post<any>(this.urlApi + '/login', { username: username, password: password })
            .pipe(map((res: any) => {

                // login successful if there's a jwt token in the response
                if (res.message.type == "S") {
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
}