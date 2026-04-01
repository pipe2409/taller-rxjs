// maneja todas las llamadas http a la ai 
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://dummyjson.com';

  constructor(private http: HttpClient) {}

  // Buscar usuario
  getUserByUsername(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/filter?key=username&value=${username}`);
  }

  //  Posts de un usuario
  getPostsByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/posts/user/${userId}`);
  }

  //  Comentarios de un post
  getCommentsByPostId(postId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/comments/post/${postId}`);
  }

  //  Obtener usuario por IDs
  getUserById(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${userId}`);
  }
}