import { PostsService } from './../../posts.service';
import { Component } from '@angular/core';
import { Form, FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatAccordion } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import {
  MatSpinner,
  MatProgressSpinnerModule,
} from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { AuthService } from '../auth.service';

@Component({
  imports: [
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatCardModule,
    CommonModule,
  ],
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  password!: string;
  email!: string;
  isLoading = false;
  constructor(private authService: AuthService) {}

  onSignUp(userForm: NgForm) {
    if (userForm.controls['email'] && userForm.controls['password']) {
      this.authService.signUp(
        userForm.controls['email'].value,
        userForm.controls['password'].value
      );
    }
  }
}
