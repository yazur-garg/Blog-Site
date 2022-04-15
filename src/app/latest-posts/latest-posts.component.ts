import { Component, Input, OnInit } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-latest-posts',
  templateUrl: './latest-posts.component.html',
  styleUrls: ['./latest-posts.component.css']
})
export class LatestPostsComponent implements OnInit {
  posts : Array<BlogPost>;

  constructor(private _postService: PostService) { }

  ngOnInit(): void {
    this._postService.getPosts(1, null, null).subscribe(
      data => {this.posts = data.slice(0,3);}
    , err => {console.log('Error: ' + err)});
  }
}
