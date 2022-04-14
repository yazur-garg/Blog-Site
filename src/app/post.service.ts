import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { BlogPost } from './BlogPost';

const perPage:number = 6;

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = "https://bti425assignment4api.herokuapp.com"

  constructor(private http:HttpClient) { }

  getPosts(page:number, tag:string|null, category:string|null): Observable<BlogPost[]>{
    var temp = this.url + "/api/posts?page=" + page + "&perPage=" + perPage;
    if (tag != null)
    {
      if (tag[0] == '#')
        temp += "&tag=" + tag.substring(1); 
      else
        temp += "&tag=" + tag; 
    }
    if (category != null)
      temp += "&category=" + category;
    return this.http.get<BlogPost[]>(temp)
                  .pipe(catchError(err => {
                     console.log('Handling error locally and rethrowing it...',err);
                     return throwError(err)}));
  }

  getPostbyId(id:any): Observable<BlogPost>{
    return this.http.get<BlogPost>(this.url + "/api/posts/" + id)
                  .pipe(catchError(err => {
                     console.log('Handling error locally and rethrowing it...',err);
                     return throwError(err)}));
  }

  getCategories(): Observable<any>{
    return this.http.get<any>(this.url + "/api/categories")
                  .pipe(catchError(err => {
                     console.log('Handling error locally and rethrowing it...',err);
                     return throwError(err)}));
  }

  getTags(): Observable<string[]>{
    return this.http.get<string[]>(this.url + "/api/tags")
                  .pipe(catchError(err => {
                     console.log('Handling error locally and rethrowing it...',err);
                     return throwError(err)}));
  }

  getAllPosts():Observable<BlogPost[]>{
    return this.http.get<any>(this.url + "/api/posts?page=1&perPage=" + Number.MAX_SAFE_INTEGER)
                  .pipe(catchError(err => {
                     console.log('Handling error locally and rethrowing it...',err);
                     return throwError(err)}));
  }

  newPost(data: BlogPost): Observable<any>{
    return this.http.post<any>(this.url + `/api/posts`, data);
  }

  updatePostById(id: string|undefined, data: BlogPost): Observable<any>{
    return this.http.put<any>(this.url + `/api/posts/${id}`, data);
  }

  deletePostById(id: string | undefined): Observable<any>{
    return this.http.delete<any>(this.url + `/api/posts/${id}`);
  }
}
