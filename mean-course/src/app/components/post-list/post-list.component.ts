import { Component } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-post-list',
  imports: [MatExpansionModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent {

  posts = [
    {
      title: 'this is first title',
      content: 'this is first content'
    },
    {
      title: 'this is second title',
      content: 'this is second content'
    },
    {
      title: 'this is third title',
      content: 'this is third content'
    }
  ]

}
