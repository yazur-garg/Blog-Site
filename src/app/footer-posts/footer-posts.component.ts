import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-footer-posts',
  templateUrl: './footer-posts.component.html',
  styleUrls: ['./footer-posts.component.css']
})
export class FooterPostsComponent implements OnInit {
  posts : Array<BlogPost>;

  constructor(private _postService: PostService) { }

  ngOnInit(): void {
    this._postService.getPosts(1, null, null).subscribe(
      data => {this.posts = data.slice(0,3);}
    , err => {console.log('Error: ' + err)});
  }
}
