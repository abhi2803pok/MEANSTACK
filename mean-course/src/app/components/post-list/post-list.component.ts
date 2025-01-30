import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import { PostsService } from '../posts.service';
import { Post } from '../post-models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  imports: [MatExpansionModule, CommonModule, FormsModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent {
  public posts!: Array<Post>;
  private postSub!: Subscription;

  //  posts = [
  //   {
  //     title: 'this is first title',
  //     content: 'this is first content'
  //   },
  //   {
  //     title: 'this is second title',
  //     content: 'this is second content'
  //   },
  //   {
  //     title: 'this is third title',
  //     content: 'this is third content'
  //   }
  // ];

  constructor(private postService:PostsService) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.postService.getPosts();
    this.postSub = this.postService.getPostUpdatedListener().subscribe((posts: Post[])=> {
      this.posts = posts
    })

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.postSub.unsubscribe();
  }

}
