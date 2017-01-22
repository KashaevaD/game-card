import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  @Input()
  public time:number;

  constructor() { }

  ngOnInit() {
  }

}
