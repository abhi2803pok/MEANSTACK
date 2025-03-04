import { Routes } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: PostListComponent,
  },
  {
    path: 'create',
    component: PostCreateComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'edit/:postId',
    component: PostCreateComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
