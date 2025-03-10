import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostCreateComponent } from "./components/post-create/post-create.component";
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "./components/header/header.component";
import { PostListComponent } from './components/post-list/post-list.component';
import { Post } from './components/post-models';
import { HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './components/auth/auth-interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    HttpClientModule
],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mean-course';
  storedPosts: Array<Post> = [];

  onPostAdded(post: Post) {
    this.storedPosts.push(post);
  }
}
