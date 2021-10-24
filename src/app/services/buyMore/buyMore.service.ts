import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../../models';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BuyMoreService {
  public paramsListPerks: string;
  constructor(private http: HttpClient) {
    this.paramsListPerks = encodeURI(JSON.stringify({
      where: { status: true },
      include: [
        {
          relation: "perkItems",
          scope: {
            include: [{ 
              relation: "item" , 
              scope: { 
                include: [{ relation: "itemOptions"}]}
            }]
          }
        }]
    }));
  };


  fetchListPerks(currentUser: User) {
    return this.http.get<any>(`${environment.apiUrl}/perks?filter=${this.paramsListPerks}`, {
      headers: { "Authorization": "Bearer " + currentUser.token }
    }).toPromise();
  };


  fetchTitle(currentUser: User) {
    return this.http.get<any>(`${environment.apiUrl}/settings/title-buy-more`, {
      headers: { "Authorization": "Bearer " + currentUser.token }
    }).toPromise();
  }
}
