import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../../models';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SettingService {
  constructor(private http: HttpClient) {

  }
  fetchLinkPerkSecret(email: string) {
    return this.http.get<any>(`${environment.apiUrl}/settings/get-link-visit-hiqshop/${email}`).toPromise();
  };
}