import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../../models';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ShippingAddressService {
  constructor(private http: HttpClient) {

  }


  fetchShippingAddress(currentUser: User) {
    return this.http.get<any>(`${environment.apiUrl}/users/${currentUser.id}/shipping-addresses`, {
      headers: { "Authorization": "Bearer " + currentUser.token }
    }).toPromise();
  };

  fetchShippingaddressById(currentUser: User, shippingAddressId: number) {
    return this.http.get<any>(`${environment.apiUrl}/users/${currentUser.id}/shipping-addresses/${shippingAddressId}`, {
      headers: { "Authorization": "Bearer " + currentUser.token }
    }).toPromise();
  }

  fetchShippingFee(currentUser: User, shippingMethodId: number, countryId: number) {
    return this.http.get<any>(`${environment.apiUrl}/users/${currentUser.id}/shipping-addresses/${shippingMethodId}/country/${countryId}`, {
      headers: { "Authorization": "Bearer " + currentUser.token }
    }).toPromise();
  };

  createShippingAddress(currentUser: User, shippingAddress: any) {
    return this.http.post<any>(`${environment.apiUrl}/users/${currentUser.id}/shipping-addresses`, shippingAddress, {
      headers: { "Authorization": "Bearer " + currentUser.token }
    }).toPromise();
  };

  updateShippingAddress(currentUser: User, shippingAddressId: number, shippingAddress: any) {
    return this.http.patch<any>(`${environment.apiUrl}/users/${currentUser.id}/shipping-addresses/${shippingAddressId}`, shippingAddress, {
      headers: { "Authorization": "Bearer " + currentUser.token }
    }).toPromise();
  }
}