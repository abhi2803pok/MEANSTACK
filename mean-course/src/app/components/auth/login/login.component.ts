import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatAccordion } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatSpinner, MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';

@Component({
  imports: [MatButtonModule, MatInputModule, FormsModule, MatProgressSpinnerModule, MatCardModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
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
