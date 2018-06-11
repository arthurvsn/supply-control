import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {

    public token: string;
    urlApi = 'http://localhost:8000/api';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });
    
    constructor(private http: HttpClient) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }
    
    login(username: string, password: string) {
        let body = { username: username, password: password };
        return this.http.post(this.urlApi + '/login', body)
            .map((response: any) => {
                
                if (response.message.type == "S") {
                    // login successful if there's a jwt token in the response
                    let token = response.dataset.token;
                    if (token) {
                        // Atribui a propriedade token 
                        this.token = token;
                        //Armazenar o nome de usuário e jwt token no local store para manter o usuário conectado entre as atualizações de página
                        localStorage.setItem('currentUser', JSON.stringify({ user: response.dataset.user, token: token }));

                        // Returna verdadeiro para indicar o login bem-sucedido
                        return true;
                    } else {
                        // Retorna falso para indicar uma falha de login
                        return false;
                    }
                } else {
                    return false;
                }
            });
    }

    logout(): void {
        // remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }

    getToken(): string {

        if (this.token) {
            return this.token;
        } else {
            if (localStorage.getItem('currentUser')) {
                let user = JSON.parse(localStorage.getItem("currentUser"));

                let token = user.token;

                if (token) {
                    this.token = token;
                    return token;
                }
            }
            else {
                return ""
            }
        }        
        
    }
}