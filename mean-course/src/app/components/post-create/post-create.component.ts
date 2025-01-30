import { Post } from './../post-models';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [
    MatInputModule,
    FormsModule,
    CommonModule,
    MatCardModule,
    MatButton,
  ],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css',
})
export class PostCreateComponent {
  newPost: Post | undefined;
  enteredContent = '';
  enteredTitle = '';

  constructor(private postService: PostsService){}

  onAddPost(postForm: NgForm) {
    if (postForm.invalid) {
      return;
    }
    this.newPost = {
      id: postForm.value.id,
      title: postForm.value.title,
      content: postForm.value.content,
    }
    this.postService.addPost(postForm.value.title, postForm.value.content);
    postForm.resetForm();
  }
}
