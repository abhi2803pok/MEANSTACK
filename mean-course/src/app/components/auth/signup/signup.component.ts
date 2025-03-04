import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatAccordion } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatSpinner, MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  imports: [MatButtonModule, MatInputModule, FormsModule, MatProgressSpinnerModule, MatCardModule, CommonModule],
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  password!: string;
  email!: string;
  isLoading = false;
  constructor() {}

  onLogin(userForm: any) {
    if(this.email==='' || this.password===''){
      return;
    }
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);


  }

}
