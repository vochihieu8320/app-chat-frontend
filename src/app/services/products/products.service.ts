import { Injectable } from '@angular/core';
import {AuthenticationService} from '../auth/authentication.service';
import {TokenService} from '../authentication/authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  Header: HttpHeaders;
  constructor(private authService: AuthenticationService, private http: HttpClient, private tokenService : TokenService) { }

  GetNewToken()
  {
    return new Promise(async (resolve, resject)=>{
      const check_expired_token = this.authService.CheckExpiredToken();
 
      if(!check_expired_token)
      {
     
        try {
          const new_auth_user = <any> await this.tokenService.RefreshToken();     
          this.authService.setLocalUserProfile(new_auth_user.token, new_auth_user.refreshToken)
          resolve(true)
        } catch (error) {
          console.log(error);
          resolve(false)
        }
      }
      else
      {
        resolve(true)
      }
    })
  }

  async CreateHeader(){
    //Can't get local storage because of getting denied from ccd-admin
    await this.GetNewToken();
    const local = localStorage.getItem("currentUser");
    const token = JSON.parse(local)["token"];
    this.Header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  async index(skip: any , limit: any)
  {
    await this.CreateHeader();
    return this.http.get(`${environment.apiUrl}/admin/products/?skip=${skip}&limit=${limit}`, {headers: this.Header}).toPromise();
  }

  async length(){
    await this.CreateHeader();
    return this.http.get(`${environment.apiUrl}/products/length`, {headers: this.Header}).toPromise();
  }

  async delete(productID){
    await this.CreateHeader();
    return this.http.delete(`${environment.apiUrl}/products/${productID}`, {headers: this.Header}).toPromise();
  }
}
