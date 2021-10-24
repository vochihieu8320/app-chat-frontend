import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  refreshToken : string;
  constructor(private http: HttpClient) { }

  
  RefreshToken()
  {
    const local = localStorage.getItem("refreshToken");
    this.refreshToken = local;
    const data = {
      refreshToken: this.refreshToken
    }
    return this.http.post(`${environment.apiUrl}/users/token`,data).toPromise();
  }

}
