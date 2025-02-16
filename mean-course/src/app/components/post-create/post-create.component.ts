import { Post } from './../post-models';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { PostsService } from '../posts.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-post-create',
  standalone: true,
imports: [
  MatInputModule,
  FormsModule,

  MatCardModule,
  CommonModule,
  MatButtonModule,
  MatProgressSpinnerModule,
],
providers: [PostsService, HttpClientModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css',
})
export class PostCreateComponent {
  newPost: Post | undefined;
  isLoading = false;
  enteredContent = '';
  enteredTitle = '';
  mode: string = 'createMode';
  postId: string | null = '';
  post: Post | undefined;

  constructor(
    private postService: PostsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.activatedRoute.paramMap.subscribe((params) => {
      if (params.has('postId')) {
        this.mode = 'editMode';
        this.postId = params.get('postId') || null;
        this.isLoading = true;
        this.postService.getPost(this.postId).subscribe((postData) => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
          };
        });
      } else {
        this.mode = 'createMode';
      }
    });
  }

  onAddPost(postForm: NgForm) {
    if (postForm.invalid) {
      return;
    }
    this.newPost = {
      id: postForm.value.id,
      title: postForm.value.title,
      content: postForm.value.content,
    };
    this.mode === 'createMode'
      ? this.postService.addPost(postForm.value.title, postForm.value.content)
      : this.postService.updatePost(
          this.postId!,
          postForm.value.title,
          postForm.value.content
        );
    postForm.resetForm();
  }
}
