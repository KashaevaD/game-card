import { Component, EventEmitter, Output } from '@angular/core';
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
  sizeSubjectUser: Subject<any>;
  sizeSubjectCells: Subject<any>;
  cells: FirebaseListObservable<any[]>;


  constructor(private _timeService: TimerService, private af : AngularFire) {
    this.users = af.database.list('/users');
    this.cells = af.database.list('/cells');
    this.sizeSubjectUser = new Subject();
    this.sizeSubjectCells = new Subject();

    const queryObservableUser = af.database.list('/users', {
      query: {
        orderByChild: 'name',
        equalTo: this.sizeSubjectUser 
      }
    });
    // subscribe to changes
    queryObservableUser.subscribe(queriedItems => {
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

    const queryObservableCells = af.database.list('/cells', {
      query: {
        orderByChild: 'id',
        equalTo: (this.sizeSubjectCells as any).id 
      }
    });

    queryObservableCells.subscribe(queriedItems => {
      console.log(queriedItems);  
    })


  }
  data:any;
  currentOpened:any[] = [];
  countHiddenBlock:number = 0;


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

  timerId:any;
  
  
  check(name:string) {
     this.userName = name;
     this.sizeSubjectUser.next(name);
     //console.log('User',this.sizeSubjectUser);
  }

  addUser(newName:string) {
    this.users.push({ name: newName });
    this.isRegistrate = true; 
    this.userName = newName;
  }

  // addCellsToBase(cell:any) {
    
  // }



  getData(data) {
    this.data = data;
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
  resetCount(number) {
    this.countHiddenBlock = number;
    this.currentOpened = [];
  }


  deleteCard(elem) {
    if (this.currentOpened.indexOf(elem) === -1 && elem.isOpen){
      this.currentOpened.push(elem);

      //console.log(this);

      if (this.currentOpened.length == 2) {
        setTimeout(()=>{
          if (this.currentOpened[0].src === this.currentOpened[1].src && this.currentOpened[0].isOpen === this.currentOpened[1].isOpen) {
            this.currentOpened[0].isHidden = true;
            this.currentOpened[1].isHidden = true;
            ++this.countHiddenBlock;
            if(this.countHiddenBlock === Math.pow(this.size,2) /2  && this.isTimerTick) {
               this.isWin = true;
               this._timeService.setChekedTime(true);
               this.isVerifiedSettings = true;
               this.isShowBtnToStart = true;
            }
          }else {
          }
          this.currentOpened[0].isOpen = false;
          this.currentOpened[1].isOpen = false;

          this.sizeSubjectCells.next( this.currentOpened[0]); 
          this.sizeSubjectCells.next( this.currentOpened[1]); 

          
          // this.addCellsToBase( this.currentOpened[0]);
          // this.addCellsToBase( this.currentOpened[1]);
          this.currentOpened = [];
        },250);
        
      } 
    }
  }



}