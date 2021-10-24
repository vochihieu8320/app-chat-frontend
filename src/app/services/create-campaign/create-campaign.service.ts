import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Campaign, CampaignPermisson, CrawlCampaign} from '../../models/create-campaign.model';
@Injectable({
  providedIn: 'root'
})
export class CreateCampaignService {
  Header: HttpHeaders;
  constructor(private http: HttpClient) { }

  CreateHeader():void {
    //Can't get local storage because of getting denied from ccd-admin
    // const local = localStorage.getItem("currentUser");
    // const token = JSON.parse(local)["token"];
    // this.Header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  crawlCampaign(data : any){
    return this.http.patch(`${environment.apiUrl}/users/crawl-campagin`, data).toPromise();
  }

  CreateCampaign(campaign: any, email : string ){
    return this.http.patch(`${environment.apiUrl}/users/crawl-campagin/create/${email}`, campaign).toPromise();
  }
  CheckPermisson(campaign: CampaignPermisson){
    return this.http.patch(`${environment.apiUrl}/users/crawl-campagin/permission`, campaign).toPromise();

  }

  Finished(data: CrawlCampaign){
    return this.http.patch(`${environment.apiUrl}/users/crawl-campagin/finished`, data).toPromise();
  }
}