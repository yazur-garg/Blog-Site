import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Array<any> | undefined;
  constructor(private _postService: PostService) { }

  ngOnInit(): void{
    this._postService.getCategories().subscribe(
      data => {this.categories = data;}
    , err => {console.log('Error: ' + err)});
  }

}