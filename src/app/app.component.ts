import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  imgStart:string = 'assets/img/btn.png';
  isStart:boolean = false;
  size:number;
  isVerifiedSettings:boolean = false; // if you enter the right size and choose level
  isTimerTick: boolean = false;      //is timer start? output variable from cards
  chekedTime: boolean;

  level:string; 

  isLive:boolean = true;
  saveLive:boolean = true;

  isWin:boolean = false;                            //need to show image win on html
  isLost:boolean = false;                   //get false, when your lives run out
  // hideAll:boolean = true;


  time: number;               //set time 
  //checkTimer:boolean;         //if you are win = true, or if you are lost = false
  timerId:any;
  readonly oneSecond:number = 1000;

  
  isVisibleAllGame():void {         //game start working
    this.isStart = true;
    //this.getTime();
  }

  getSize(size, level):void {
    if (size && level) {
      this.size = size;
      this.level = level;
      console.log(this.size);
      this.isVerifiedSettings= true; 
    }
    else {
      alert("My dear player, I understand that you do not want to enter something(( but you need");
    }
    
  }

  isStartTimer(flag:boolean) {
    this.isTimerTick = flag;  
    if (this.isTimerTick) {
      this.getTime();
      console.log(flag);
    }
    else {
      alert('flad');
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


  setTime(level, size) {
    //this.chekedTime = null;
    if (level == 1) {
    
     if (size <= 4) {
        this.time = 6 * this.oneSecond;
      }
      else if (size > 4) {
        this.time = 20 * this.oneSecond;
      }

    }
    else if (level == 2) {

      if (size <= 4) {
        this.time = 15 * this.oneSecond;
      }
      else if (size > 4) {
        this.time = 30 * this.oneSecond;
      }
    }
  }

  getTime () {
    if (this.isLive) {
    this.setTime(this.level, this.size);
    this.timerId = setInterval (() => this.changeTime(), 1000);
    } else {
      this.isVerifiedSettings = false;
    }
    
  }

  changeTime() {

    if (!this.time && !this.chekedTime) {
      // if (!this.time) {
        clearInterval(this.timerId);
        this.isTimerTick = false;
        this.saveLive = false;    //pop image lives array
        //this.setTime(this.level, this.size);
        return;
      
    } else {
       if (this.chekedTime && this.time) {
           clearInterval(this.timerId);
           this.isTimerTick = false;
           this.saveLive = true;  //savelive
          // this.setTime(this.level, this.size);
           return;
         }
        this.isTimerTick = true;
        return this.time -= 1000;
    }
  }
}

