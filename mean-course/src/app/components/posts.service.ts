// src/app/components/posts.service.ts
import { Injectable } from '@angular/core';
import { Post } from './post-models';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Array<Post>>();

  constructor(private httpClient: HttpClient) {}

  getPosts() {
    return this.httpClient
      .get<{ message: string; posts: Post[] }>(
        'http://localhost:3000/api/posts'
      )
      .subscribe((response) => {
        this.posts = response.posts;
        this.postUpdated.next([...this.posts]);
      });
  }

  getPostUpdatedListener() {
    return this.postUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    this.posts.push({ id: 'null', title: title, content: content });
    this.httpClient
      .post<{ message: string }>('http://localhost:3000/api/posts', {
        title: title,
        content: content,
      })
      .subscribe((response) => {
        if (response.message === 'Post added successfully') {
          console.log('Post added successfully');
          this.posts.push({ id: 'null', title: title, content: content });
          this.postUpdated.next([...this.posts]);
        }
      });
  }
}
