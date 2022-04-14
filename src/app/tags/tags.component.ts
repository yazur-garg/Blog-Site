import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tags: Array<string>|undefined;
  constructor(private _postService: PostService) { }

  ngOnInit(): void {
    this._postService.getTags().subscribe(
      data => {this.tags = data;}
    , err => {console.log('Error: ' + err)});
  }

}
