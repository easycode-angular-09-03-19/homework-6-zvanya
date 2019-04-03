import { Component, Input, OnInit } from '@angular/core';
import { IPost } from '../../interfaces/IPost';

@Component({
  selector: 'app-posts-item',
  templateUrl: './posts-item.component.html',
  styleUrls: ['./posts-item.component.css']
})
export class PostsItemComponent implements OnInit {
  @Input() post: IPost;
  
  constructor() { }

  ngOnInit() {
  }

}
