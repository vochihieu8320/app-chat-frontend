import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TopupService {
  Header: HttpHeaders;
  constructor(private http: HttpClient) { }

  CreateHeader():void {
    //Can't get local storage because of getting denied from ccd-admin
    const local = localStorage.getItem("currentUser");
    const token = JSON.parse(local)["token"];
    this.Header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  AddListTopUp(data: any){
    this.CreateHeader();
    return this.http.patch(`${environment.apiUrl}/auto-topup-perks`, data, {headers: this.Header}).toPromise();
  }

  ConfigTopUp(data: any){
    this.CreateHeader();
    return this.http.patch(`${environment.apiUrl}/auto-topups`, data, {headers: this.Header}).toPromise();
  }

  UpdateConfigTopUp(data: any, id: any){
    this.CreateHeader();
    return this.http.patch(`${environment.apiUrl}/auto-topups/${id}`, data, {headers: this.Header}).toPromise();
  }

  CheckExistedTopUp(campaignId: any){
    this.CreateHeader();
    return this.http.get(`${environment.apiUrl}/auto-topups/${campaignId}`, {headers: this.Header}).toPromise();
  }

  GetListPerkTopUp(autoTopupId: any, pagenum: number){
    this.CreateHeader();
    const filter={where:{autoTopupId:autoTopupId},include:[{relation:"perk"}], "skip": pagenum,"limit": 5};
    const params = encodeURI(JSON.stringify(filter));
    return this.http.get(`${environment.apiUrl}/auto-topup-perks?filter=${params}`, {headers: this.Header}).toPromise();
    
  }
  
  CountPerkTopUp(autoTopupId: any){
    this.CreateHeader();
    const filter={where:{autoTopupId:autoTopupId}};
    const params = encodeURI(JSON.stringify(filter));
    return this.http.get(`${environment.apiUrl}/auto-topup-perks/count?filter=${params}`, {headers: this.Header}).toPromise();
  }

  UpdatePerkTopUp(data: any, id: any){
    this.CreateHeader();
    return this.http.patch(`${environment.apiUrl}/auto-topup-perks/${id}`, data, {headers: this.Header}).toPromise();
  }

  DeletePerkTopUp(id: any){
    this.CreateHeader();
    return this.http.delete(`${environment.apiUrl}/auto-topup-perks/${id}`, {headers: this.Header}).toPromise();    
  }

}
