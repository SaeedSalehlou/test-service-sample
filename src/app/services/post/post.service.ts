import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostModel } from '../../models/post-model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  API_URL = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private http: HttpClient) { }

  public get() {
    return this.http.get<PostModel[]>(this.API_URL);
  }

  public create(post: PostModel) {
    const headers = new HttpHeaders;
    return this.http.post(this.API_URL, post, { headers })
  }
}
