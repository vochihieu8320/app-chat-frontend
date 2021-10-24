import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetAccountService {

  constructor(private http: HttpClient) { }

  getAccount(email: string): Promise<any> {
    return this.http.post<any>(`${environment.apiUrl}/users/quick-access`, { email }).toPromise();
  }
}
