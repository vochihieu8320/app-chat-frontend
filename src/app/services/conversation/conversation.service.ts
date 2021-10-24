import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../../models';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  constructor(private http: HttpClient) {
  }
  fetchConversationType() {
    return this.http.get<any>(`${environment.apiUrl}/settings/conversation-types`).toPromise();
  };

  createConversation(conversationForm: FormData, currentUser: User) {
    return this.http.post<any>(`${environment.apiUrl}/users/${currentUser.id}/conversations`, conversationForm, {
      headers: { "Authorization": "Bearer " + currentUser.token }
    }).toPromise();
  };

  fetchConversations(currentUser: User, filter: any) {
    const params = encodeURI(JSON.stringify({
      ...filter,
      order: "status ASC, updatedAt DESC",
      include: [
        {
          relation: "messages",
          scope: {
            order: "createdAt ASC"
          }
        },
        {
          relation: "campaign",
        }
      ]
    }));
    return this.http.get<any>(`${environment.apiUrl}/users/${currentUser.id}/conversations?filter=${params}`, {
      headers: { "Authorization": "Bearer " + currentUser.token }
    }).toPromise();
  };

  fetchConversationById(currentUser: User, conversationId: number) {
    let params = encodeURI(JSON.stringify({
      include: [
        {
          relation: "messages",
          scope: {
            order: "createdAt ASC"
          }
        }
      ]
    }));
    return this.http.get<any>(`${environment.apiUrl}/users/${currentUser.id}/conversations/${conversationId}?filter=${params}`, {
      headers: { "Authorization": "Bearer " + currentUser.token }
    }).toPromise();
  };

  createMessageForConversation(currentUser: User, conversationId: number, message: FormData) {
    return this.http.post<any>(`${environment.apiUrl}/conversations/${conversationId}/messages`, message, {
      headers: { "Authorization": "Bearer " + currentUser.token }
    }).toPromise();
  };

}