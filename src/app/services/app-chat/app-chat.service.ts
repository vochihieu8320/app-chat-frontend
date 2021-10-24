import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AuthenticationService} from '../auth/authentication.service';
import {TokenService} from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AppChatService {

  Header: HttpHeaders;
  init_state: string;
  constructor(private http: HttpClient, private tokenService : TokenService, private authService: AuthenticationService) {
    this.init_state ="";
   }


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

  async CreateChannel(data: any)
  {
    await this.CreateHeader();
    
    return this.http.post(`${environment.apiUrl}/channels`, data, {headers: this.Header}).toPromise();
  }

  async joinchanel(data: any)
  {
  
    return this.http.post(`${environment.apiUrl}/channels/join-channel`, data).toPromise();

  }

  async getUserChannel(userID: string, skip: number)
  {
    await this.CreateHeader();
    return this.http.get(`${environment.apiUrl}/channels-user/?userID=${userID}&skip=${skip}`, {headers: this.Header}).toPromise();
  }


  async updateFile(userID: string, author: string, channelID: string, filetype: string, data: FormData)
  {
    this.CreateHeader();
    return this.http.post(`${environment.apiUrl}/upload?userID=${userID}&channelID=${channelID}&filetype=${filetype}&author=${author}`, data, {headers: this.Header}).toPromise();
  }


  async getConversation(channelID: string)
  {
    await this.CreateHeader();
    return this.http.get(`${environment.apiUrl}/conversation/${channelID}`, {headers: this.Header}).toPromise();
  }

  async checkChannel(userID : string)
  {
    await  this.CreateHeader();
  
    return this.http.get(`${environment.apiUrl}/channels-user/check-channel/${userID}`, {headers: this.Header}).toPromise();
  }

  async updateChannel(channelID: string, data: any)
  {
    await this.CreateHeader();
    return this.http.patch(`${environment.apiUrl}/channels/${channelID}`, data , {headers: this.Header} ).toPromise();
  }

  async deleteChannel(userID: string, channelID: string)
  {
    await this.CreateHeader();
    return this.http.delete(`${environment.apiUrl}/channels/?userID=${userID}&channelID=${channelID}`, {headers: this.Header}).toPromise();
  }
 

}


