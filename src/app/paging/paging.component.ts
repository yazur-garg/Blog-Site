import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit {
  @Input("page") inputpage : number | undefined;
  @Output() newPage = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  previouspage()
  {
    if(this.inputpage! > 1)
      this.newPage.emit(this.inputpage! - 1)
  }

  nextpage(){
      this.newPage.emit(this.inputpage! + 1)
  }

}
