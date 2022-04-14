import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';
import { BlogPost } from '../BlogPost';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  constructor(private _postService: PostService, private route: ActivatedRoute) { }
  blogPosts: Array<BlogPost> | undefined;
  page: number = 1;
  tag:string | null = null;
  category:string | null = null;
  querySub:any;
  ngOnInit(): void {
    this.querySub = this.route.queryParams.subscribe(params => {
      if(params['tag']){
        this.tag = params['tag'];
        this.category = null;
      }else{
        this.tag = null;
      }
      if(params['category']){
        this.category = params['category'];
        this.tag = null;
      }else{
        this.category = null;
      }
      this.getPage(+params['page'] || 1);
     });
  }

  getPage(num: number){
    this._postService.getPosts(num, this.tag, this.category).subscribe(
      data => {this.blogPosts = data; this.page = num;}
    , err => {console.log('Error: ' + err)});
  }

  ngOnDestroy(){
    if(this.querySub) this.querySub.unsubscribe();
  }
}
