import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnsubcribeService {
  Header: HttpHeaders;
  constructor(private http: HttpClient) { }


  Unsubcribe(data: any){

    return this.http.patch(`${environment.apiUrl}/email-unsubs`,data).toPromise();
  }
}
