import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CampaignConversationsService {
  Header: HttpHeaders;
  constructor(private http: HttpClient) { }

  CreateHeader():void {
    //Can't get local storage because of getting denied from ccd-admin
    const local = localStorage.getItem("currentUser");
    const token = JSON.parse(local)["token"];
    this.Header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }


  GetConversations(_campaignId: any, page:  number, size: number){
    this.CreateHeader();
    let query = {"where":{campaignId: _campaignId} ,"limit": page, "skip": size, "order":["status ASC, updatedAt DESC"]};
    const uri = JSON.stringify(query);
    const encoded = encodeURIComponent(uri); 
    return this.http.get(`${environment.apiUrl}/conversations/campaign?filter=${encoded}`,
    {headers: this.Header}).toPromise();
  }

  Count(id){
    this.CreateHeader();
    return this.http.get(`${environment.apiUrl}/conversations/${id}/campaign/count`,
    {headers: this.Header}).toPromise();
  }

  filterConversations(value, skip: number){
    this.CreateHeader();
    let query = {"where": value, "limit": 5, "skip": skip, "order":["status ASC, updatedAt DESC"]};
    const uri = JSON.stringify(query);
    const encoded = encodeURIComponent(uri);
    return this.http.get(`${environment.apiUrl}/conversations/campaign?filter=${encoded}`,
    {headers: this.Header}).toPromise();
  }

  paging(value){
    this.CreateHeader();
    let query ={"where": value};
    const uri = JSON.stringify(query);
    const encoded = encodeURIComponent(uri);
    return this.http.get(`${environment.apiUrl}/conversations/campaign/paging?filter=${encoded}`,
    {headers: this.Header}).toPromise();
  }


  update(data, id){
    this.CreateHeader();
    return this.http.patch(`${environment.apiUrl}/conversations/${id}`,data, {headers: this.Header}).toPromise();

  }

  GetDetail(id){
    this.CreateHeader();
    return this.http.get(`${environment.apiUrl}/conversations/${id}`,{headers: this.Header}).toPromise();
  }

  DeleteCurrentData(listMessages:any[], idex: number){
   
    listMessages.splice(idex, 1);
    
  }
  delete(id){
    this.CreateHeader();
  
    return this.http.delete(`${environment.apiUrl}/conversations/${id}`, {headers: this.Header}).toPromise();
    
  }

  getCreator(id: number){
    this.CreateHeader()
    return this.http.get(`${environment.apiUrl}/users/${id}/conversations/creator`, {headers: this.Header}).toPromise();
  }
}
