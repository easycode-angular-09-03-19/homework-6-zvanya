import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { PostsService } from "../../services/posts.service";
import { IPost } from '../../interfaces/IPost';
import { Location } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  currentUserId: string;
  posts: IPost[];
  
  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private location: Location,
    private msgService: MessageService
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe((param: ParamMap) => {
      this.currentUserId = param.get('userId');

      this.postsService.getPostsByUserId(this.currentUserId).subscribe((data: IPost[]) => {
        this.posts = data;
      }, (err) => {
        this.msgService.add({
          severity:'error',
          summary: `Ошибка`,
          detail: err.message,
          key: 'err'
        });
      });
    })
  }
  
  goBack() {
    this.location.back();
  }
}
