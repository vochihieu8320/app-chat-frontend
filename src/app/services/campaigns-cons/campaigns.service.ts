import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
@Injectable({
  providedIn: 'root'
})
export class CampaignsService {
  Header: HttpHeaders;
  current_user_id : number;
  constructor(private http: HttpClient) { }

  CreateHeader():void {
    //Can't get local storage because of getting denied from ccd-admin
    const local = localStorage.getItem("currentUser");
    const token = JSON.parse(local)["token"];
    this.current_user_id = +JSON.parse(local)["id"];
    this.Header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
  }
  GetCampaignTeam(page, size){
    let query = { "limit": page, "skip": size, "order":"updatedAt DESC", "where":{ "userId": this.current_user_id}};
    const uri = JSON.stringify(query);
    const encoded = encodeURIComponent(uri);  
    this.CreateHeader();
    return this.http.get(`${environment.apiUrl}/campaign-team/?filter=${encoded}`,
    {headers: this.Header}).toPromise();

  }

  GetCampaignInfo(id_campaign){
    this.CreateHeader();
    return this.http.get(`${environment.apiUrl}/campaignteams/${id_campaign}/campaign`).toPromise();
  }

  Count(){
    this.CreateHeader();
    return this.http.get(`${environment.apiUrl}/users/${this.current_user_id}/campaign-team/count`).toPromise();
  }

  filterCampaign(value: any, skip, id_user){
    this.CreateHeader();
    let query = {"where": value, "limit": 5, "skip": skip, "order":"updatedAt DESC"};
    const uri = JSON.stringify(query);
    
    const encoded = encodeURIComponent(uri);
    return this.http.get(`${environment.apiUrl}/campaigns/user/${id_user}/?filter=${encoded}`, {headers:this.Header}).toPromise();
  }

  paging(value: any){
    this.CreateHeader();
    let query ={"where": value};
    const uri = JSON.stringify(query);
    const encoded = encodeURIComponent(uri);
    return this.http.get(`${environment.apiUrl}/campaigns/paging?filter=${encoded}`,{headers: this.Header}).toPromise();
  }

  getCampaignConversation_unread(campaign_id){
    this.CreateHeader();
    return this.http.get(`${environment.apiUrl}/conversations/${campaign_id}/campaign-unread`,{headers: this.Header}).toPromise();
  }

  



}
