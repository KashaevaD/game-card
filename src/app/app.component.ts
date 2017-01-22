import { Component } from '@angular/core';
import { TimerService } from './timer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TimerService]
})
export class AppComponent {

  constructor(private timer: TimerService) {

  }

  imgStart:string = 'assets/img/btn.png';
  isStart:boolean = false;
  size:number;
  isVerifiedSettings:boolean = false;    // if you enter the right size and choose level
  isShowBtnToStart:boolean = false;

  level:string;

  isLive:boolean = true;
 

  isWin:boolean = false;                 //need to show image win on html
  isLost:boolean = false;                //get false, when your lives run out

  time: number;                          //set time
  timerId:any;
  isTimerTick: boolean = false;          //is timer start? output variable from cards
  chekedTime: boolean;                   //if you are win = true, or if you are lost = false
  saveLive:boolean = true;
  readonly oneSecond:number = 1000;
 

  isVisibleAllGame():void {               //game start working
    this.isStart = true;
  }

  getSize(size, level):void {
    if (size && level) {
      this.size = size;
      this.level = level;
      this.isVerifiedSettings= true;
      this.isShowBtnToStart = true;
    }
    else {
      alert("My dear player, I understand that you do not want to enter something(( but you need");
    }
  }

  isStartTimer(flag:boolean) {
    this.isTimerTick = flag;
    if (this.isTimerTick) {
      this.getTime();
    }
  }

  isWork(flag) {
    this.chekedTime = flag;
  }

  setWin(flag) {
    this.isWin = flag;
  }

  isAlive(flag:boolean) {
    this.isLive = flag;

  }

  public setTime(level, size) {
      if (level == 1) {

        if (size == 2) {
           this.time = 6 * this.oneSecond;
        }
        else if (size == 4) {
          this.time = 30 * this.oneSecond;
        }
        else if (size == 6) {
          this.time = 50 * this.oneSecond;
        }
        else if (size == 8) { 
          this.time = 60 * this.oneSecond;
        }

      }
      else if (level == 2) {

         if (size == 2) {
           this.time = 6 * this.oneSecond;
        }
        else if (size == 4) {
          this.time = 30 * this.oneSecond;
        }
        else if (size == 6) {
          this.time = 60 * this.oneSecond;
        }
        else if (size == 8) {
          this.time = 80 * this.oneSecond;
        }

      }
  }

  getTime () {
    this.setTime(this.level, this.size);
    this.timerId = setInterval (() => this.changeTime(), 1000);
  }

  changeTime() {

    if (!this.time && !this.chekedTime) {
      clearInterval(this.timerId);
      this.isTimerTick = false;
      this.saveLive = false;    //pop image lives array
      return;
    } else {
       if (this.chekedTime && this.time) {
           clearInterval(this.timerId);
           this.isTimerTick = false;
           this.saveLive = true;  //savelive
           return;
         }
        this.isTimerTick = true;
        this.time =  this.time - 1000;
        return this.time;
    }
  }
}