// src/app/components/posts.service.ts
import { Injectable } from '@angular/core';
import { Post } from './post-models';
import { map, max, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: Post[] = [];
  private postUpdated = new Subject<{ posts: Post[]; postCount: number }>();
  constructor(private httpClient: HttpClient, private router: Router) {}
  updatePost(id: string, title: string, content: string, image: File | string) {
    let postData: Post | FormData;
    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image,
      };
    }
    this.httpClient
      .put<{ message: string; imagePath: string }>(
        'http://localhost:3000/api/posts/' + id,
        postData
      )
      .subscribe((response) => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex((p) => p.id === id);
        updatedPosts[oldPostIndex] = {
          id: id,
          title: title,
          content: content,
          imagePath: response.imagePath,
        };
        this.posts = updatedPosts;
        this.postUpdated.next({
          posts: [...this.posts],
          postCount: this.posts.length,
        });
        this.router.navigate(['/']);
      });
  }

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pageSize=${postsPerPage}&page=${currentPage}`;
    return this.httpClient
      .get<{ message: string; posts: any[]; maxPosts: number }>(
        'http://localhost:3000/api/posts' + queryParams
      )
      .pipe(
        map((postData) => {
          return {
            posts: postData.posts.map((post: any) => {
              return {
                id: post._id,
                title: post.title,
                content: post.content,
              };
            }),
            maxPosts: postData.maxPosts,
          };
        })
      )

      .subscribe((transformedPostsData) => {
        this.posts = transformedPostsData.posts;
        this.postUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostsData.maxPosts,
        });
      });
  }

  postDelete(id: string): Observable<any> {
  return  this.httpClient
      .delete('http://localhost:3000/api/posts/' + id);
  }

  getPostUpdatedListener() {
    return this.postUpdated.asObservable();
  }

  getPost(id: string | null) {
    return this.httpClient.get<{ _id: string; title: string; content: string }>(
      'http://localhost:3000/api/posts/' + id
    );
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image as Blob, title);
    this.httpClient
      .post<{ message: string; id: string; imagePath: string }>(
        'http://localhost:3000/api/posts',
        postData
      )
      .subscribe((response) => {
        if (response.message === 'Post added successfully') {
          console.log('Post added successfully');
          const newPost: Post = {
            id: response.id,
            title: title,
            content: content,
            imagePath: response.imagePath,
          };
          this.posts.push(newPost);
          this.postUpdated.next({
            posts: [...this.posts],
            postCount: this.posts.length,
          });
          this.router.navigate(['/']);
        }
      });
  }
}
