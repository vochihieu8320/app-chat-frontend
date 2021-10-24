import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CampaignServiceService {
  Header: HttpHeaders;

  constructor(private http: HttpClient) { }

  
  CreateHeader():void {
    //Can't get local storage because of getting denied from ccd-admin
    const local = localStorage.getItem("currentUser");
    const token = JSON.parse(local)["token"];
    this.Header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }


  GetMessages(_conversationnId: any, page:number, size: number){
    this.CreateHeader();
    let query = {"where": {conversationId: _conversationnId}};
    const uri = JSON.stringify(query);
    
    const encoded = encodeURIComponent(uri); 
    return this.http.get(`${environment.apiUrl}/conversations/message?filter=${encoded}`,
    {headers: this.Header}).toPromise();
  }

  UpdateMessage(data, id) {
    this.CreateHeader();
    return this.http.patch(`${environment.apiUrl}/conversations/message/${id}`, data,
    {headers: this.Header}).toPromise();
  }

  CreateMess(data : any, id){
    this.CreateHeader();
    return this.http.post(`${environment.apiUrl}/conversations/${id}/messages-campaigner`,data,{headers: this.Header}).toPromise();
  }

}
