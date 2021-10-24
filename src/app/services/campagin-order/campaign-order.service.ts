import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {OrdersService} from '../../services/orders/orders.service';
import { User, FormInputShippingAddress } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class CampaignOrderService {
  Header: HttpHeaders;
  public paramsDetailsOrder: string;
  constructor(private http: HttpClient) {
    this.paramsDetailsOrder = encodeURI(JSON.stringify({ include: [{ relation: "orderPerks", scope: { include: [{ relation: "perk" }, { relation: "orderPerkItems", scope: { include: [{ relation: "item", scope: { include: [{ relation: "itemOptions" }] } }] } }] } }] }));

   }

  CreateHeader():void {
    //Can't get local storage because of getting denied from ccd-admin
    const local = localStorage.getItem("currentUser");
    const token = JSON.parse(local)["token"];
  
    this.Header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getDetailOrder(number: string){
    this.CreateHeader()
    return this.http.get(`${environment.apiUrl}/orders-detail/${number}?filter=${this.paramsDetailsOrder}`,
    {headers: this.Header}).toPromise();
  }

  getStatus(){
    this.CreateHeader()
    return this.http.get(`${environment.apiUrl}/orders-status`,
    {headers: this.Header}).toPromise();
  }
  getCountry(){
    this.CreateHeader();
    return this.http.get<any>(`${environment.apiUrl}/countries`, {
      headers: this.Header
    }).toPromise();
  }
  getPaymentMethod(){
    this.CreateHeader();
    return this.http.get<any>(`${environment.apiUrl}/campaign/order-payments`, {
      headers: this.Header
    }).toPromise();
  }

  getshippingMethods(){
    this.CreateHeader();
    return this.http.get<any>(`${environment.apiUrl}/orders/shipping-methods`, {
      headers: this.Header
    }).toPromise();
  }
  Update_status(data : any, order_id : number){
    this.CreateHeader();
    return this.http.patch(`${environment.apiUrl}/orders/${order_id}/status`,data,
     {headers : this.Header}).toPromise();
  }
  Update_order(orderId: number, orderPerks: any){
    this.CreateHeader();
    return this.http.patch(`${environment.apiUrl}/order-campaign/item-options/${orderId}/?filter=${this.paramsDetailsOrder}`, {orderPerks}, 
    {headers: this.Header}).toPromise();
  }

  Update_shipping_info( shippingAddress: FormInputShippingAddress, confirmFinal: boolean, orderId: number){
    return this.http.patch<any>(`${environment.apiUrl}/order-campaign/shipping-info/${orderId}?filter=${this.paramsDetailsOrder}`, {
      shippingAddress, confirmFinal
    }, {
      headers: this.Header
    }).toPromise();

  }
  
}
