import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {Users} from '../Modeles/user';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<Users>;
  public currentUser: Observable<Users>;
  constructor(private http: HttpClient,
              private router: Router) {
    this.currentUserSubject = new BehaviorSubject<Users>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }


    public get currentUserValue(): Users {
      return this.currentUserSubject.value;
    }

    getAuthorizationToken(): string {
      return JSON.parse(localStorage.getItem('currentUser'));
    }


    login(username: string, password: string){
        return this.http.post(`${this.url}/login`, {username, password}).pipe(
          // tslint:disable-next-line:no-shadowed-variable
           map(Users => {
            localStorage.setItem('currentUser', JSON.stringify(Users));
            this.currentUserSubject.next( Users as Users);
            console.log(JSON.stringify(Users));
          }));
    }


  logout() {
    setTimeout(() => {
      window.location.reload(true);
      localStorage.removeItem('currentUser');
      localStorage.removeItem(this.currentUserValue.token);
      this.currentUserSubject.next(null);
    }, 100, this.router.navigate(['/login']));

  }


  getMyToken() {
    const token = this.currentUserValue.token;
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    const isExpired = helper.isTokenExpired(token);
    const ex = helper.getTokenExpirationDate(`${token}`);
    return decodedToken;
  }

}
