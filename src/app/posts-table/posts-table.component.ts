import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.css']
})
export class PostsTableComponent implements OnInit {

  blogPosts:Array<BlogPost> = [];

  constructor(private _postService: PostService, private route: Router) { }

  ngOnInit(): void {
    this._postService.getAllPosts().subscribe(
      data => {this.blogPosts = data;}
    , err => {console.log('Error: ' + err)});
  }

  rowClicked(e:any, id:any){
    this.route.navigate(['admin/post', id]);
  }

}
