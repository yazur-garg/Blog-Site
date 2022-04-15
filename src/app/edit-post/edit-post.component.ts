import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  blogPost: BlogPost = new BlogPost();
  tags: string;

  constructor(private _postService: PostService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this._postService.getPostbyId(this.route.snapshot.params['id']).subscribe(
      data => {this.blogPost = data; this.tags = data.tags.toString();}
    , err => {console.log('Error: ' + err)});

  }

  formSubmit() {
      this.blogPost.tags = this.tags.split(",").map(tag => tag.trim());
      this._postService.updatePostById(this.blogPost._id,this.blogPost).subscribe(
        data => {this.router.navigate(['admin']);}
      , err => {console.log('Error: ' + err)});
   }

   deletePost() {
      this._postService.deletePostById(this.blogPost._id).subscribe(
        data => {this.router.navigate(['admin']);}
      , err => {console.log('Error: ' + err)});
   }

}
