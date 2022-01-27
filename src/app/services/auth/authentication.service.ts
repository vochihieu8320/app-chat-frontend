import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../../models';
import jwtDecode from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  Header: HttpHeaders;
  public currentUser: Observable<User>
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')
      ));
    this.currentUser = this.currentUserSubject.asObservable();
  };

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  };

  public setUserProfile(property: string, value: any): void {
    const user = this.currentUserValue;
    if (user && user[property]) {
      user[property] = value;
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
    }
  };




  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/users/login`, { email, password })
      .pipe(map(data => {
      
        if(data.error){
          return "invalid"
        }
        else{

        
        this.setLocalUserProfile(data.token, data.refreshToken);
        return "confirmed";
        }
      }))
  };


  CreateHeader():void {
    //Can't get local storage because of getting denied from ccd-admin
    const local = localStorage.getItem("currentUser");
    const token = JSON.parse(local)["token"];
    this.Header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  logout() {
    this.CreateHeader();
    const local = localStorage.getItem("currentUser");
    const username = JSON.parse(local)["name"];
    localStorage.removeItem('currentUser');
    localStorage.removeItem('refreshToken');
    this.currentUserSubject.next(null);
    return this.http.delete(`${environment.apiUrl}/users/${username}`, {headers: this.Header}).toPromise();
  };

  register(name: string, email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/users/register`, { name, email, password }).toPromise();
  };






  async checkLoggin() {
    let currentUser = this.currentUserSubject.value;
    const refreshToken = localStorage.getItem("refreshToken");

    if(refreshToken)
    {
        const current_date = new Date();
        const expired_token = currentUser.exp*1000 
        //check account's token is expired or not
        if((currentUser && expired_token < current_date.getTime()) || !currentUser)
        {         
          // get refreshtoken
          return false;
        }
        else
        {
          return true
        }
    }
    else
    {
      return false;
    }
    
  };

  public setLocalUserProfile(token : string, refreshToken: string): void {
    try {
      const decoded = Object(jwtDecode(token));
      const user: User = {
        ...decoded,
        token
      };

      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('refreshToken', refreshToken);
      this.currentUserSubject.next(user);
    } catch (error) {
      
    }

  }

  checkTokenQuickAccess(token: string): Promise<any> {
    return this.http.get<any>(`${environment.apiUrl}/users/quick-access/${token}`).toPromise();
  }
  checkTokenAppQuickAccess(token: string): Promise<any> {
    return this.http.get<any>(`${environment.apiUrl}/users/app-quick-access/${token}`).toPromise();
  }

  removeCurentUser() {
    localStorage.removeItem('currentUser');
  }

  removeRefreshToken()
  {
    localStorage.removeItem('refreshToken');
  }


  CheckExpiredToken()
  {
    let currentUser = this.currentUserSubject.value;
    const current_date = new Date();
    const expired_token = currentUser.exp*1000
    if((currentUser && expired_token < current_date.getTime()) || !currentUser)
    {
        return false;
    }
    return true;
  }

  refreshtoken()
  {
    const refreshToken = localStorage.getItem("refreshToken");
    const body = {
      refreshToken: refreshToken
    }
   
    return this.http.post(`${environment.apiUrl}/users/token`, body).toPromise();

  }


}
