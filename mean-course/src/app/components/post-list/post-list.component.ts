import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { PostsService } from '../posts.service';
import { Post } from '../post-models';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  imports: [
    MatExpansionModule,
    CommonModule,
    FormsModule,
    RouterModule,
    MatPaginatorModule,
  ],
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
})
export class PostListComponent {
  public posts!: Array<Post>;
  private postSub!: Subscription;
  totalPosts = 10;
  pageSize = 3;
  pageSizeOptions = [1, 2, 5, 10];
  currentPage = 1;

  constructor(private postService: PostsService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.postService.getPosts(this.pageSize, this.currentPage);
    this.postSub = this.postService
      .getPostUpdatedListener()
      .subscribe(({ posts, postCount }) => {
        this.totalPosts = postCount;
        this.posts = posts;
      });
  }

  editPost(id: string) {
    this.postService.getPost(id);
  }
  onDelete(id: string) {
    this.postService.postDelete(id).subscribe(() => {
      this.postService.getPosts(this.pageSize, this.currentPage);
    });
  }

  onChangePage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.pageSize = pageData.pageSize;
    this.postService.getPosts(this.pageSize, this.currentPage);
    console.log(pageData);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.postSub.unsubscribe();
  }
}
