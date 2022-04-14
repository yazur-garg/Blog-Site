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
  post : BlogPost | undefined;
  querySub : any;
  commentName:string|undefined;
  commentText:string|undefined;
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
    date: new Date().toLocaleDateString() };
    this.post?.comments?.push(comment);
    if (this.post != undefined)
      this._postService.updatePostById(this.post._id,this.post).subscribe(
        data => {this.commentName="";this.commentText="";}
      , err => {console.log('Error: ' + err)});
  }

  ngOnDestroy(): void{
    if(this.querySub) this.querySub.unsubscribe();
  }
}
