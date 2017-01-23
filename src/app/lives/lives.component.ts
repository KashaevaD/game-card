import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-lives',
  templateUrl: './lives.component.html',
  styleUrls: ['./lives.component.css']
})
export class LivesComponent implements OnInit, OnChanges {

  @Input()
  public time:number;
  @Input()
  public save:boolean;                    //true if you are win and you heart is save
  @Output() isLived:EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (!this.save && this.time === 0) {
      this.livesImage.pop();
    }
    
    if (this.livesImage.length > 0) {
      this.isLived.emit(true);
    }
    else if (this.livesImage.length === 0) {
      this.isLived.emit(false);
    }
  }

  livesImage:string[] = [                 //count heart
  "assets/img/h1.png",
  "assets/img/h1.png",
  "assets/img/h1.png"
  ];

}
