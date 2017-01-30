import { Component, OnInit, Input,Output, EventEmitter, OnChanges} from '@angular/core';
import {CardService} from './card.service'
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  providers: [CardService]
})

export class CardsComponent implements OnInit, OnChanges {
  @Input()
  public size:number;                                   // count of cells = size*size
  @Input()
  public showBtnToStartGame:boolean;                    // is normal size, neeed to show button "Game Start"
  @Input()
  public level:number;                                  //level of game
  @Input()
  public isTimerTick:boolean;                            //if timer is run  = true
  @Input()
  public isLive:boolean;                                 //if count of lives more then 1, you can play again
  @Input()
  public isShowBtnToStart:boolean;
  @Input()
  public countHiddenBlock:number;
  // @Input()
  // public cell;

  @Output() checkTimer:EventEmitter<boolean> = new EventEmitter();  // true - you are winner, false - you are luser               
  @Output() isShowTimer:EventEmitter<boolean> = new EventEmitter(); // variable to show the timer on main app
  @Output() showImageWin:EventEmitter<any> = new EventEmitter();    //if you are win, the pictire will be shown
  @Output() newLevel:EventEmitter<any> = new EventEmitter();
  @Output() sendData:EventEmitter<any> = new EventEmitter();
  @Output() removeCard: EventEmitter<any> = new EventEmitter();
  @Output() resetCountOpened: EventEmitter<any> = new EventEmitter();

  public clickBtnStart:boolean = false;            //show table with cards or not
  //public data: {src:string, id:number,isOpen: boolean, isHidden:boolean}[][];        //our data with image and their id(name)  
  public data: any[][];
  public coutnOfVictory = 0;
  public cell;

  // cells:FirebaseListObservable<any[]>;
  //  cellsFB: FirebaseListObservable<any[]>;
  cells:FirebaseListObservable<any[]>;
 

  constructor(private _card: CardService, private af:AngularFire) {
     // this.cells = af.database.list('/cells');
     this.cells = af.database.list('/cells');
    //  this.cellsFB.subscribe(data=>this.cells);
     //const observableCells = af.database.list('/cells');

    this.cells.subscribe(cell => {
      this.data = cell[0];
      console.log('card', this.data);
    })
  }



  ngOnInit() {}

  ngOnChanges() {
     if (!this.isTimerTick && this.isLive) {
       this.showBtnToStartGame = true;
    }
    else if (!this.isLive) {
      this.showBtnToStartGame = false;
    }
  }

  getStart(button):void {   
    this.cells.remove();
    //if ( this.coutnOfVictory < 3) {
                                    //start when your click on btn "GameStart"
    //this.data = this._card.createTable(this.size);         //create our table cards
    this.sendToFireBase();

    this.sendData.emit(this.data);

    this.showImageWin.emit(false);                          //hide win image
    this.checkTimer.emit(false);                            //set false to you loser image
    this.clickBtnStart =  true;                             //show table with cards
    this.showBtnToStartGame = false;                        //hide btn when you are playing game

    this.isTimerTick = button.returnValue;                  //start timer if tou click on btnStart
    this.isShowTimer.emit(this.isTimerTick);                //show timer in the screen

    this.resetCountOpened.emit(0);
    //reset all params
    // this._card.setCountHiddenBlock(0);
    // this._card.setCurrentOpened([]);
    // this._card.setDiffClassForLevel(this.level);
    //} 
  }

  sendToFireBase() {
    // this.data.forEach((row) => {
    //   row.forEach((cell)=>{
    //     this.cells.push({src: cell.src, id: cell.id, isOpen: cell.isOpen, isHidden: cell.isHidden});
    //   });
    // });
    //this.cells.push(this.data);
    this.cells.push(this._card.createTable(this.size));
  }  

  addClassActive(cell):void { 
    this.cell = cell;                                 //add active class on active td
    this.cell.isOpen = !this.cell.isOpen;
    this.removeCard.emit(this.cell);
   
    //if(this._card.areYouWin(this.size,this.isTimerTick, )) {
     //if(this.countHiddenBlock === Math.pow(this.size,2) /2  && this.isTimerTick) {
        //this.checkTimer.emit(true);
        //this.showImageWin.emit(true);
        //this.coutnOfVictory++;
        //if (this.coutnOfVictory < 3) this.showBtnToStartGame = true;
        //this.showBtnToStartGame = true;
        //this.newLevel.emit(this.coutnOfVictory);
    //}
   //console.log(this.cell);
  }



}