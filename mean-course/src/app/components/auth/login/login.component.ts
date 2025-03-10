import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatAccordion } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import {
  MatSpinner,
  MatProgressSpinnerModule,
} from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../auth.service';
import { Route } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  imports: [
    MatButtonModule,
    CommonModule,
    MatInputModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatCardModule,
  ],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  password!: string;
  email!: string;
  isLoading = false;
  constructor(private authService: AuthService, private router: Router) {}

  onLogin(userForm: any) {
    this.authService.login(
      userForm.controls['email'].value,
      userForm.controls['password'].value
    );
    this.router.navigate(['/']);
  }
}
