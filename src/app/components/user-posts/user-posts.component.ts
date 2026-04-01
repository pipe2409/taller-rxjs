import { Component, Input } from '@angular/core';
import { Post } from '../../modelo/post';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent {
  @Input() posts: Post[] = [];
}