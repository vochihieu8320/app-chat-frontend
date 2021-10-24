import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { range } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  Header: HttpHeaders;
  filter = {include: [{relation: "platform"}, {relation: "perks"}, {relation: "items"}]};
  constructor(private http: HttpClient) {

  }

  CreateHeader():void {
    //Can't get local storage because of getting denied from ccd-admin
    const local = localStorage.getItem("currentUser");
    const token = JSON.parse(local)["token"];
    this.Header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  

  fetchCampaign(currentUser: User) {
    const params = encodeURI(JSON.stringify({
      include: [{ relation: 'platform' }]
    }));
    return this.http.get<any>(`${environment.apiUrl}/campaigns?filter=${params}`, {
      headers: { "Authorization": "Bearer " + currentUser.token }
    }).toPromise();
  };

  detailCampaign(id: number){
    this.CreateHeader();
    const params = encodeURI(JSON.stringify(this.filter))
    return this.http.get(`${environment.apiUrl}/campaigns/${id}?filter=${params}`, {headers : this.Header}).toPromise();
  }

   getCampaignPerks(pagenum: number, id: number){
    this.CreateHeader();
    const my_filter = {"where" : {"campaignId" : id}, "skip": pagenum,"limit": 5};
    const params = encodeURI(JSON.stringify(my_filter));
    return this.http.get(`${environment.apiUrl}/campaigns/Perks?filter=${params}`, {headers : this.Header}).toPromise();

  }
 
  SearchCampaignPerks(pagenum: number, id: number, perksName: string){
    this.CreateHeader();
    const my_filter = {"where" : {"campaignId" : id, "name": {like : `%${perksName}%`}}, "skip": pagenum,"limit": 5};
    const params = encodeURI(JSON.stringify(my_filter));
    return this.http.get(`${environment.apiUrl}/campaigns/Perks?filter=${params}`, {headers : this.Header}).toPromise();

  }

  SearchCampaignItems(pagenum: number, id: number, ItemName : string){
    this.CreateHeader();
    const my_filter = {"where" : {"campaignId" : id, "name": {like : `%${ItemName}%`}}, "skip": pagenum,"limit": 5};
    const params = encodeURI(JSON.stringify(my_filter));
    return this.http.get(`${environment.apiUrl}/campaigns/Items?filter=${params}`, {headers : this.Header}).toPromise();

  }

  getCampaignItems(pagenum: number, id: number){
    this.CreateHeader();
    const my_filter = {where : {campaignId : +id }, skip: pagenum,  limit: 5};
    const params = encodeURI(JSON.stringify(my_filter));
    return this.http.get(`${environment.apiUrl}/campaigns/Items?filter=${params}`, {headers : this.Header}).toPromise();

  }

  
  PerksCount(my_filter: any){
    this.CreateHeader();
    // const my_filter = {campaignId : +campaignId };
    const params = encodeURI(JSON.stringify(my_filter));
    return this.http.get(`${environment.apiUrl}/campaigns/Perks/count?where=${params}`, {headers : this.Header}).toPromise();
  }

  ItemsCount(my_filter : any){
    this.CreateHeader();
    // const my_filter = {campaignId : +campaignId};
    const params = encodeURI(JSON.stringify(my_filter));
    return this.http.get(`${environment.apiUrl}/campaigns/Items/count?where=${params}`, {headers : this.Header}).toPromise();
  }

  updateCampaign(data: any, id: any){
    this.CreateHeader()
    return this.http.patch(`${environment.apiUrl}/campaigns/${id}`, data, {headers: this.Header}).toPromise();
  }


  getPlatform(){
    this.CreateHeader()
    return this.http.get(`${environment.apiUrl}/platforms`, {headers: this.Header}).toPromise();

  }

  // CreateTopUp(id: number, data: any){
  //   this.CreateHeader();
  //   return this.http.patch(`${environment.apiUrl}/auto-topups`, data, {headers: this.Header}).toPromise();
  // }

}