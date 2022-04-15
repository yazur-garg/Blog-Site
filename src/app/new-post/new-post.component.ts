import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  blogPost: BlogPost = new BlogPost();
  tags: string;

  constructor(private _postService: PostService, private route: Router) { }


  ngOnInit(): void {
  }

  formSubmit() {
    this.blogPost.tags = this.tags.split(",").map(tag => tag.trim());
    this.blogPost.isPrivate = false;
    this.blogPost.postDate = new Date().toDateString();
    this.blogPost.postedBy = "BTI425 Student";
    this.blogPost.views = 0;
    console.log(this.blogPost);
    this._postService.newPost(this.blogPost).subscribe(
      () => this.route.navigate(['admin']),
      err => {console.log(err)});
 }
}
