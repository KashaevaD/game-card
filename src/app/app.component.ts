import { Component } from '@angular/core';
import { TimerService } from './timer.service';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import { Subject } from 'rxjs/Subject';

// import {Timer} from "./timer/timer";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TimerService]
})
export class AppComponent {
  users: FirebaseListObservable<any[]>;
  sizeSubject: Subject<any>;


  constructor(private _timeService: TimerService, private af : AngularFire) {
    this.users = af.database.list('/users');
    this.sizeSubject = new Subject();

    const queryObservable = af.database.list('/users', {
      query: {
        orderByChild: 'name',
        equalTo: this.sizeSubject 
      }
    });
    // subscribe to changes
    queryObservable.subscribe(queriedItems => {
      if (queriedItems.length !== 0){
         console.log(queriedItems);
         this.isRegistrate = true; 
      } 
      else {
        alert('Sorry, but you need to regestrate');
        this.newUser = true;
      }
      //console.log(queriedItems);  
    });

  }

  isRegistrate:boolean = false;
  newUser:boolean = false;
  userName:string;
  imgStart:string = 'assets/img/btn.png';
  isStart:boolean = false;
  size:number;
  isVerifiedSettings:boolean = false;    // if you enter the right size and choose level
  isShowBtnToStart:boolean = false;

  level:string;

  isLive:boolean = true;
 

  isWin:boolean = false;                 //need to show image win on html
  isLost:boolean = false;                //get false, when your lives run out

 // time: number;                          //set time
  timerId:any;
  //isTimerTick: boolean = false;          //is timer start? output variable from cards
  //chekedTime: boolean;                   //if you are win = true, or if you are lost = false
  //saveLive:boolean = true;
  //readonly oneSecond:number = 1000;
  
  check(name:string) {
      this.userName = name;
     this.sizeSubject.next(name);
  }

  addUser(newName:string) {
    this.users.push({ name: newName });
    this.isRegistrate = true; 
    this.userName = newName;
  }

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
    this._timeService.setIsTimerTick(flag);
    if (this._timeService.getIsTimerTick()) {
     this._timeService.getTime(this.level, this.size);
      
    }
  }

  isWork(flag) {
    this._timeService.setChekedTime(flag);
  }

  setWin(flag) {
    this.isWin = flag;
  }

  isAlive(flag:boolean) {
    this.isLive = flag;
  }

  isTimerTick(): boolean {
    return this._timeService.getIsTimerTick();            //get variable isTimerTick in service
  }

  getTime():number {
    return this._timeService.getCurrentTime();            //get variable time in service
  }


  isResetNewLevel(count) {
    // if (count === 3) {
    //  this.isStart = true;
    //  this.isVerifiedSettings = false;
    // }
  }

}