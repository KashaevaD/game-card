import { Component, OnInit, Input,Output, EventEmitter, OnChanges} from '@angular/core';
import {CardService} from './card.service'

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

  @Output() checkTimer:EventEmitter<boolean> = new EventEmitter();  // true - you are winner, false - you are luser               
  @Output() isShowTimer:EventEmitter<boolean> = new EventEmitter(); // variable to show the timer on main app
  @Output() showImageWin:EventEmitter<any> = new EventEmitter();    //if you are win, the pictire will be shown

  public clickBtnStart:boolean = false;            //show table with cards or not
  public data: {src:string, id:number}[][];        //our data with image and their id(name)  

  constructor(private _card: CardService) {}

  ngOnInit() {}

  ngOnChanges() {
     if (!this.isTimerTick && this.isLive) {
       this.showBtnToStartGame = true;
    }
    else if (!this.isLive) {
      this.showBtnToStartGame = false;
    }
  }

  getStart(button):void {                                  //start when your click on btn "GameStart"
    this.data = this._card.createTable(this.size);         //create our table cards

    this.showImageWin.emit(false);                          //hide win image
    this.checkTimer.emit(false);                            //set false to you loser image
    this.clickBtnStart =  true;                             //show table with cards
    this.showBtnToStartGame = false;                        //hide btn when you are playing game

    this.isTimerTick = button.returnValue;                  //start timer if tou click on btnStart
    this.isShowTimer.emit(this.isTimerTick);                //show timer in the screen
    //reset all params
    this._card.setCountHiddenBlock(0);
    this._card.setCurrentOpened([]);
    this._card.setDiffClassForLevel(this.level);
  }

  addClassActive(i):void {                                  //add active class on active td
    // let img = i.target.firstElementChild;  
    // if(this._card.getLengthCurrentOpened() < 2) {
    //   if (img !== null) {                                   //if you click double on the picture = > it wiil be normal, nothing happend
    //     this._card.pushElementInCurrentOpened(img);         //push elem to the current array with cards
    //     img.classList.add(this._card.getActiveClass());     //add class active to the card
    //   } 
    // }
    // else  if (this._card.getLengthCurrentOpened() === 2) {
    //     if (this._card.getFirstElementNameCurOpened() === this._card.getLastElementNameCurOpened() ) { 
    //         this._card.addClassHide();                      //hide the same cards
    //     }
    //     this._card.resetSettings();                         //to close all card
    // }

    // if(this._card.areYouWin(this.size,this.isTimerTick)) {
    //    this.checkTimer.emit(true);
    //    this.showImageWin.emit(true);
    //    this.showBtnToStartGame = true;
    // }
    let img = i.target.firstElementChild;

    if (img !== null) {
      this._card.pushElementInCurrentOpened(img);
      img.classList.add(this._card.getActiveClass());
      if(this._card.getLengthCurrentOpened() === 2) {

        setTimeout(()=>{

          if (this._card.getFirstElementNameCurOpened() === this._card.getLastElementNameCurOpened() ) { 
             this._card.addClassHide();
          }
          this._card.resetSettings();
          if(this._card.areYouWin(this.size,this.isTimerTick)) {
             this.checkTimer.emit(true);
             this.showImageWin.emit(true);
             this.showBtnToStartGame = true;
          }
        },350);

      }
    }

  }



}