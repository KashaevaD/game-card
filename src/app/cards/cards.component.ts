import { Component, OnInit, Input,Output, EventEmitter, OnChanges} from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
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

  public clickBtnStart:boolean = false;          //show table or not

  public images:{src:string, id:number}[]  = [                             //images in table
    {
      src: 'assets/img/0.jpg',
      id: 0
    },
    {
      src: 'assets/img/1.jpg',
      id: 1
    }
    // },
    // {
    //   src: 'assets/img/2.jpg',
    //   id: 2
    // },
    // {
    //   src: 'assets/img/3.jpg',
    //   id: 3
    // }
  ];
  public data: {src:string, id:number}[][];        //our data with image and their id(name)

  public currentOpened: any[] = [];                //current opened image
  public hideClass:string;                         //variable for hide class
  public activeClass:string;                       //variable for active class

  public countHiddenBlock: number = 0;             //count of hidden block, need to count disappeared pair image to choose the win or not
  constructor() {}

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
    this.showImageWin.emit(false);
    this.checkTimer.emit(false);
    this.clickBtnStart =  true;
    this.showBtnToStartGame = false;
    this.data = this.createTable();
    this.isTimerTick = button.returnValue;
    this.isShowTimer.emit(this.isTimerTick);
    this.countHiddenBlock = 0;
    this.currentOpened = [];
    this.setDiffClassForLevel();
  }


  private setDiffClassForLevel() {                    //set different class to element dependent on level
     if (this.level == 2) {
        this.hideClass = "hide";
        this.activeClass = "active";
    }
    else {
        this.hideClass = "hideBlock";
        this.activeClass = "activeBlock";
    }
  }

  private createTable():any[][] {                     //create double array
    let current = this.createArray();
    let currentArray = this.createRandomImage(current);
    let matrix = [[]];
    let count = 0;
    for (let i = 0; i < this.size; i++) {
      matrix[i] = [];
      for (let j = 0; j < this.size; j++) {
        matrix[i][j] = currentArray[count];
        count++;
      }
    }
    return matrix;
  }

   private createRandomImage(array):any[] {           //random order in array
    return array.sort(function() {
        return 0.5 - Math.random();
    });
  }

  private createArray():any[] {                       //create array with img
    let arr = [];
    let count = 0;

    for (let i = 0; i < Math.pow(this.size,2)/2; i++) {
      arr[i] = this.images[count];
      count++;
      if (count >= this.images.length) {
          count = 0;
      } 
    }
    let result = arr.concat(arr);

    return result;
  }
  /*__________________________________________________*/
  addClassActive(i):void { //add active class on active td
    console.log(this.isTimerTick);
    let img = i.target.firstElementChild;  
    if(this.currentOpened.length < 2) {
      if (img !== null) {
        this.currentOpened.push(img);
        img.classList.add(this.activeClass);
      } 
    }
    else  if (this.currentOpened.length === 2) {
        if (this.currentOpened[0].name === this.currentOpened[1].name) {
            this.addClassHide();
        }
        this.resetSettings();
    }

    if(this.areYouWin()) {
       this.checkTimer.emit(true);
       this.showImageWin.emit(true);
       this.showBtnToStartGame = true;
    }
  }

  private addClassHide():void {
      this.currentOpened[0].parentElement.parentElement.classList.add(this.hideClass); // to do opacity:0 for td (td->div->img)
      this.currentOpened[1].parentElement.parentElement.classList.add(this.hideClass); // to do opacity:0 for td (td->div->img)
      this.countHiddenBlock++;
  }

  private resetSettings():void {
      this.currentOpened[0].classList.remove(this.activeClass);
      this.currentOpened[1].classList.remove(this.activeClass);
      this.currentOpened = [];
  }

  /*_____________________________________________________________________*/
  private areYouWin():boolean {
     if (this.countHiddenBlock === Math.pow(this.size,2) /2  && this.isTimerTick){
      this.countHiddenBlock = 0;
      this.currentOpened = [];
      return true;
    }
  }

}