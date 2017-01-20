import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lives',
  templateUrl: './lives.component.html',
  styleUrls: ['./lives.component.css']
})
export class LivesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

    livesImage:string[] = [                 //count heart
    "assets/img/live.ico",
    "assets/img/live.ico",
    "assets/img/live.ico"
    ];

}
