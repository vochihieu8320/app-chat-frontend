import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
@Injectable({
  providedIn: 'root'
})
export class OrderQuickAccessService {

  constructor(private http: HttpClient) { }

  getstatus():Observable<any> {
    return this.http.get(`${environment.apiUrl}/orders/status`);
  }


  FindOrder(email):Observable<any>{

    let query ={
      "include": [
        {
          "relation": "orderPerks",
          "scope": {
            "include": [
              {
                "relation": "perk"
              },
              {
                "relation": "orderPerkItems",
                "scope": {
                  "include": [
                    {
                      "relation": "item",
                      "scope": {
                        "include": [
                          {
                            "relation": "itemOptions"
                          }
                        ]
                      }
                    },
                    {
                      "relation": "itemOption"
                    }
                  ]
                }
              }
            ]
          }
        }
      ]
    }
    
    const uri = JSON.stringify(query);     
    
    const encoded = encodeURIComponent(uri);
    console.log(`${environment.apiUrl}/orders/quick-check/${email}?filter=${encoded}`)
    return this.http.get(`${environment.apiUrl}/orders/quick-check/${email}?filter=${encoded}`);

  }
}
