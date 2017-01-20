import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-lives',
  templateUrl: './lives.component.html',
  styleUrls: ['./lives.component.css']
})
export class LivesComponent implements OnInit, OnChanges {

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges() {
    if (!this.save && this.time == 0) {
      this.livesImage.pop();
    }
    if (this.livesImage.length > 0) {
      this.isLived.emit(true);
    }
    else {
      this.isLived.emit(false);
    }
  }

    @Input() time;
    @Input() save;
    @Output() isLived:EventEmitter<boolean> = new EventEmitter();

    livesImage:string[] = [                 //count heart
    "assets/img/live.ico",
    "assets/img/live.ico",
    "assets/img/live.ico"
    ];

}
