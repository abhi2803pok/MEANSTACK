// src/app/components/posts.service.ts
import { Injectable } from '@angular/core';
import { Post } from './post-models';
import { map, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Array<Post>>();
  constructor(private httpClient: HttpClient, private router: Router) {}
  updatePost(id: string, title: string, content: string) {
    this.httpClient
      .put('http://localhost:3000/api/posts/' + id, {
        id: id,
        title: title,
        content: content,
      })
      .subscribe((response) => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex((p) => p.id === id);
        updatedPosts[oldPostIndex] = {
          id: id,
          title: title,
          content: content,
        };
        this.posts = updatedPosts;
        this.postUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  getPosts() {
    return this.httpClient
      .get<{ message: string; posts: Post[] }>(
        'http://localhost:3000/api/posts'
      )
      .pipe(
        map((postData) => {
          return postData.posts.map((post: any) => {
            return {
              id: post._id,
              title: post.title,
              content: post.content,
            };
          });
        })
      )
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postUpdated.next([...this.posts]);
      });
  }

  postDelete(id: string) {
    this.httpClient
      .delete('http://localhost:3000/api/posts/' + id)
      .subscribe(() => {
        const updatedPosts = this.posts.filter((post) => post.id !== id);
        this.posts = updatedPosts;
        this.postUpdated.next([...this.posts]);
      });
  }

  getPostUpdatedListener() {
    return this.postUpdated.asObservable();
  }

  getPost(id: string | null) {
    return this.httpClient.get<{ _id: string; title: string; content: string }>('http://localhost:3000/api/posts/' + id);
  }

  addPost(title: string, content: string) {
    this.httpClient
      .post<{ message: string; id: string }>(
        'http://localhost:3000/api/posts',
        {
          title: title,
          content: content,
        }
      )
      .subscribe((response) => {
        if (response.message === 'Post added successfully') {
          console.log('Post added successfully');
          const newPost: Post = {
            id: response.id,
            title: title,
            content: content,
          };
          this.posts.push(newPost);
          this.postUpdated.next([...this.posts]);
          this.router.navigate(['/']);
        }
      });
  }
}
