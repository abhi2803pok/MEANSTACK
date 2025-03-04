import { Post } from './../post-models';
import { MatButton, MatButtonModule } from '@angular/material/button';
import {
  MatProgressSpinnerModule,
  MatSpinner,
} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
    ReactiveFormsModule,
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
  form!: FormGroup;
  isLoading = false;
  enteredContent = '';
  enteredTitle = '';
  mode: string = 'createMode';
  postId: string | null = '';
  post: Post | undefined;
  imagePreview: string | undefined;

  constructor(
    private postService: PostsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(1000)],
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
      }),

    });

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
            content: postData.content
          };

          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
            image: null,
          });
        });
      } else {
        this.mode = 'createMode';
      }
    });
  }

  onImageUploadPicked(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) {
      return;
    }
    const file = input.files[0];
    this.form.patchValue({ image: file });
    this.form.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onAddPost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    this.newPost = {
      id: this.form.value.id,
      title: this.form.value.title,
      content: this.form.value.content,
    };
    this.mode === 'createMode'
      ? this.postService.addPost(this.form.value.title, this.form.value.content, this.form.value.image)
      : this.postService.updatePost(
          this.postId!,
          this.form.value.title,
          this.form.value.content,
          this.form.value.image
        );
    this.form.reset();
  }
}
