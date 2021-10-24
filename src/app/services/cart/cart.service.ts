import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../../models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public paramsDetailCart: string;
  public paramsDetailCartPerk: string;
  constructor(private http: HttpClient) {
    this.paramsDetailCart = encodeURI(JSON.stringify({ "fields": { "createdAt": false, "updatedAt": false }, "include": [{ "relation": "cartPerks", "scope": { "fields": { "createdAt": false, "updatedAt": false }, "include": [{ "relation": "perk", "scope": { "fields": { "createdAt": false, "updatedAt": false }, "include": [{ "relation": "perkItems", "scope": { "fields": { "createdAt": false, "updatedAt": false } } }] } }, { "relation": "cartPerkItems", "scope": { "fields": { "createdAt": false, "updatedAt": false }, "include": [{ "relation": "item", "scope": { "fields": { "createdAt": false, "updatedAt": false }, "include": [{ "relation": "itemOptions", "scope": { "fields": { "createdAt": false, "updatedAt": false } } }] } }, { "relation": "itemOption", "scope": { "fields": { "createdAt": false, "updatedAt": false } } }] } }] } }] }))
    this.paramsDetailCartPerk = encodeURI(JSON.stringify(
      {
        "fields": {
          "createdAt": false,
          "updatedAt": false
        },
        "include": [
          {
            "relation": "perk",
            "scope": {
              "fields": {
                "createdAt": false,
                "updatedAt": false
              },
              "include": [
                {
                  "relation": "perkItems",
                  "scope": {
                    "fields": {
                      "createdAt": false,
                      "updatedAt": false
                    }
                  }
                }
              ]
            }
          },
          {
            "relation": "cartPerkItems",
            "scope": {
              "fields": {
                "createdAt": false,
                "updatedAt": false
              },
              "include": [
                {
                  "relation": "item",
                  "scope": {
                    "fields": {
                      "createdAt": false,
                      "updatedAt": false
                    },
                    "include": [
                      {
                        "relation": "itemOptions",
                        "scope": {
                          "fields": {
                            "createdAt": false,
                            "updatedAt": false
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  "relation": "itemOption",
                  "scope": {
                    "fields": {
                      "createdAt": false,
                      "updatedAt": false
                    }
                  }
                }
              ]
            }
          }
        ]
      }
    ))
  }

  fetchDetailCart(currentUser: User) {
    return this.http.get<any>(`${environment.apiUrl}/users/${currentUser.id}/carts?filter=${this.paramsDetailCart}`, {
      headers: { "Authorization": "Bearer " + currentUser.token }
    }).toPromise();
  };

  fetchCartCount(currentUser: User) {
    return this.http.get<any>(`${environment.apiUrl}/users/${currentUser.id}/carts/count`, {
      headers: { "Authorization": "Bearer " + currentUser.token }
    }).toPromise();
  };

  addToCart(currentUser: User, perk: any) {
    return this.http.patch<any>(`${environment.apiUrl}/users/${currentUser.id}/carts/add-perk`, perk, {
      headers: { "Authorization": "Bearer " + currentUser.token }
    }).toPromise();
  };

  deleteCartPerk(currentUser: User, cartId: number, cartPerkId: number) {
    return this.http.delete<any>(`${environment.apiUrl}/users/${currentUser.id}/carts/${cartId}/cart-perks/${cartPerkId}`, {
      headers: { "Authorization": "Bearer " + currentUser.token }
    }).toPromise();
  };

  updatedPerkInCart(currentUser: User, cartId: number, cartPerkId: number, perk: any) {
    return this.http.patch<any>(`${environment.apiUrl}/users/${currentUser.id}/carts/${cartId}/cart-perks/${cartPerkId}?filter=${this.paramsDetailCartPerk}`, perk, {
      headers: { "Authorization": "Bearer " + currentUser.token }
    }).toPromise();
  }
}