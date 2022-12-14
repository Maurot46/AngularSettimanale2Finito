import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface AuthData {
    accessToken: string;
    user: {
        id: number,
        name: string,
        email: string,
        password: string
    };
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
    jwtHelper = new JwtHelperService()
    url = 'http://localhost:4201';
    private authSubj = new BehaviorSubject<null | AuthData>(null);

    user$ = this.authSubj.asObservable();
    timeoutLogout: any

    constructor(private http: HttpClient, private router: Router) {
        this.ripristina()
    }

    login(data: { email: string; password: string }) {
        return this.http.post<AuthData>(`${this.url}/login`, data).pipe(
            tap((data) => {
                console.log(data);
                this.authSubj.next(data);
                localStorage.setItem('user', JSON.stringify(data));
                this.autoLogout(data)
            })
        );
    }
    ripristina() {
        const user = localStorage.getItem('user');
        if (!user) {
            return;
        }
        const userdata: AuthData = JSON.parse(user);
        if (this.jwtHelper.isTokenExpired(userdata.accessToken)) {
            return
        }
        this.authSubj.next(userdata)

        this.autoLogout(userdata)
    }
    registration(data: { name: string; email: string; password: string }) {
        return this.http.post(`${this.url}/register`, data);
    }
    logout() {
        this.authSubj.next(null);
        localStorage.removeItem('user')
        this.router.navigate(['/login'])
        if (this.timeoutLogout) {
            clearTimeout(this.timeoutLogout)
        }
    }
    autoLogout(data: AuthData) {
        const exDate = this.jwtHelper.getTokenExpirationDate(data.accessToken) as Date
        const exMs = exDate.getTime() - new Date().getTime()
        this.timeoutLogout = setTimeout(() => {
            this.logout()
        }, exMs);
    }

}
