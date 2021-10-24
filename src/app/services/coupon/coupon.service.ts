import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../../models';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CouponService {
  constructor(private http: HttpClient) {

  }

  applyCoupon(currentUser: User, couponCode: string, grossAmount : number) : Promise<any> {
    return this.http.get(`${environment.apiUrl}/coupons/${couponCode}/apply/${grossAmount}`, {
      headers: { "Authorization": "Bearer " + currentUser.token }
    }).toPromise();
  }
}