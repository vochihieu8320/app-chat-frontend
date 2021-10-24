import { User } from '../../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  Header: HttpHeaders;

  constructor(private http: HttpClient) {

  };

  CreateHeader():void {
    //Can't get local storage because of getting denied from ccd-admin
    const local = localStorage.getItem("currentUser");
    const token = JSON.parse(local)["token"];
    this.Header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }


  updateUserProfile(currentUser: User, userProfile: any) {
    return this.http.put<any>(`${environment.apiUrl}/users/update-profile`, userProfile, {
      headers: { "Authorization": "Bearer " + currentUser.token }
    }).toPromise();
  };

  uploadAvatar(currentUser: User, fileAvatar: File) {
    const formData: FormData = new FormData();
    formData.append('avatar', fileAvatar, fileAvatar.name);
    return this.http.post<any>(`${environment.apiUrl}/users/${currentUser.id}/update-avatar`, formData , {
      headers: { "Authorization": "Bearer " + currentUser.token }
    }).toPromise();
  }

  
  GetUser(value: any){
    this.CreateHeader();
    let query = {"where": value};
    const uri = JSON.stringify(query);
    const encoded = encodeURIComponent(uri); 
    return this.http.get(`${environment.apiUrl}/users?filter=${encoded}`, {headers: this.Header}).toPromise();
  }

  GetDetail(value: any):Observable<any>{
    this.CreateHeader();
    let query = {"where": value};
    const uri = JSON.stringify(query);
    const encoded = encodeURIComponent(uri); 
    return this.http.get(`${environment.apiUrl}/users?filter=${encoded}`, {headers: this.Header})
  }

  Confirm(id, regConfirm): Promise<any>{
    return this.http.get(`${environment.apiUrl}/users/${id}/veryfy-account/${regConfirm}`).toPromise();

  }

  CheckAlready_Confirm(id, regConfirm): Promise<any>{
    return this.http.get(`${environment.apiUrl}/users/${id}/already-veryfy-account/${regConfirm}`).toPromise();
  }
}
