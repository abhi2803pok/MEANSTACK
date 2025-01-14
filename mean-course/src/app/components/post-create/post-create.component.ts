import {MatButton} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card'

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [MatInputModule, FormsModule, CommonModule, MatCardModule, MatButton],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent {
  newPost = '';
  enteredValue = '';

  onAddPost() {
    this.newPost = this.enteredValue;
  }
}
