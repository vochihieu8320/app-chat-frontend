import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ForgotService {

  constructor(private http: HttpClient) {

  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/users/password-re-issued`, { email })
      .pipe(map(data => {
        if (data && data.status) {
          localStorage.removeItem("currentUser");
          return data.status
        } else {
          return false
        };
      }))
  }
}
