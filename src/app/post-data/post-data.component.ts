import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.css']
})
export class PostDataComponent implements OnInit {
  post : BlogPost;
  querySub : any;
  commentName:string;
  commentText:string;
  constructor(private _postService: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.querySub = this.route.params.subscribe(params =>{
      this._postService.getPostbyId(params['id']).subscribe(
        data => {this.post = data;}
      , err => {console.log('Error: ' + err)});
     })
  }

  submitComment(){
    var comment = {author: this.commentName,
    comment: this.commentText,
    date: new Date().toDateString() };
    this.post.comments.push(comment);
    this._postService.updatePostById(this.post._id,this.post).subscribe(
      data => {this.commentName="";this.commentText="";});
  }

  ngOnDestroy(): void{
    if(this.querySub) this.querySub.unsubscribe();
  }
}
