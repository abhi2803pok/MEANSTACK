import { CommonModule } from '@angular/common';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, RouterModule, FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  protected isUserAuthenticated!: boolean;
  constructor(private authService: AuthService) {

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.isUserAuthenticated = isAuthenticated;
    });

  }

}
