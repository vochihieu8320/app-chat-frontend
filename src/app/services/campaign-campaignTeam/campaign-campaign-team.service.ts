import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CampaignCampaignTeamService {
  Header: HttpHeaders;
  constructor(private http: HttpClient) { }

  CreateHeader():void {
    //Can't get local storage because of getting denied from ccd-admin
    const local = localStorage.getItem("currentUser");
    const token = JSON.parse(local)["token"];
    this.Header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  //Get User Accepted
  GetUserAccepted(id_campaign){
    this.CreateHeader();
    return this.http.get(`${environment.apiUrl}/campaignteams/${id_campaign}/campaign-accepted`,
    {headers: this.Header}).toPromise();
  }

  GetUserUnAccepted(id_campaign){
    this.CreateHeader();
    return this.http.get(`${environment.apiUrl}/campaign-team-ivitations/${id_campaign}/campaign-unaccecpted`,
    {headers: this.Header}).toPromise();
  }

 
  GetOwner(id_campaign, id_user){
    this.CreateHeader();
    return this.http.get(`${environment.apiUrl}/campaignteams/${id_campaign}/owner/${id_user}`, {headers: this.Header}).toPromise();

  }
  DeleteCurrentData(listMessages:any[], idex: number){
   
    listMessages.splice(idex, 1);
    
  }

  delete(id_campaign, id_user){
    this.CreateHeader();
    return this.http.delete(`${environment.apiUrl}/campaignteams/${id_campaign}/campaign/${id_user}`,
    {headers: this.Header}).toPromise();
  }

  deleteinvite(email){
    this.CreateHeader();
    return this.http.delete(`${environment.apiUrl}/campaign-team-ivitations/${email}`, {headers: this.Header}).toPromise();
  }

  ResendInvite(email){
    this.CreateHeader();
    return this.http.get(`${environment.apiUrl}/campaign-team-ivitations/resend-invite/${email}`,
    {headers: this.Header}).toPromise();
  }

  CreateInvite(data){
    this.CreateHeader();
    return this.http.patch(`${environment.apiUrl}/campaign-team-ivitations`, data, {headers: this.Header}).toPromise();
  }

  CheckInvitie(code: string){
  
    return this.http.get(`${environment.apiUrl}/campaign-team-ivitations/${code}/accept-invite`,
    {headers: this.Header}).toPromise();
  }

  GetInviteInfo(code: String){
    return this.http.get(`${environment.apiUrl}/campaign-team-ivitations/${code}`,
    {headers: this.Header}).toPromise(); 
  }

  UpdateCampaginDeleteInvite(email:string){
    return this.http.get(`${environment.apiUrl}/campaign-team-ivitations/campaign-update/${email}`,
    {headers: this.Header}).toPromise(); 
  }
}

