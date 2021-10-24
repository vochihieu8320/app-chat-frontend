import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SakilaService {

  Header: HttpHeaders;
  constructor(
    private http: HttpClient
  ) { }

  // Actor service
  
  getActor(skip: number){;
    const filter = {"skip": skip, "limit": 5, "order":"last_udpate DESC"};
    const params = encodeURI(JSON.stringify(filter));

    return this.http.get(`${environment.apiUrl}/actors?filter=${params}`).toPromise();
  }
  countActor(){
    return this.http.get(`${environment.apiUrl}/actors/count`).toPromise();
  }

  updateActor(data: any)
  {
    return this.http.patch(`${environment.apiUrl}/actor`, data).toPromise();
  }

  getDetailActor(id: string)
  {
    return this.http.get(`${environment.apiUrl}/actors/${id}`).toPromise();
  }
  deleteActor(id: string)
  {
    return this.http.delete(`${environment.apiUrl}/actors/${id}`).toPromise();
  }
  createActor(data: string)
  {
    return this.http.post(`${environment.apiUrl}/actor`, data).toPromise();
  }

}
