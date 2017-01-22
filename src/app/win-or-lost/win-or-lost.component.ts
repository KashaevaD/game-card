import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-win-or-lost',
  templateUrl: './win-or-lost.component.html',
  styleUrls: ['./win-or-lost.component.css']
})
export class WinOrLostComponent implements OnInit {

  @Input()
  public isWin:boolean;
  @Input()
  public time:number;
  @Input()
  public isLive:number;

  constructor() {
  }

  ngOnInit() {
  }

  imageWin:string = "assets/img/win.gif";   //image of winner
  imageLost:string = "assets/img/lost.gif"; //image of looser
}
