import { Injectable } from '@angular/core';

@Injectable()
export class CardService {

  constructor() { }
  private images:{src:string, id:number}[]  = [                             //images in table
    {
      src: 'assets/img/0.jpg',
      id: 0
    },
    {
      src: 'assets/img/1.jpg',
      id: 1
    },
    {
      src: 'assets/img/2.jpg',
      id: 2
    },
    {
      src: 'assets/img/3.jpg',
      id: 3
    }
  ];

  private currentOpened: any[] = [];                //current opened image
  private hideClass:string;                         //variable for hide class
  private activeClass:string;                       //variable for active class
  private countHiddenBlock: number = 0;             //count of hidden block, need to count disappeared pair image to choose the win or not


  private createArray(size):any[] {                       //create array with img
    let arr = [];
    let count = 0;

    for (let i = 0; i < Math.pow(size,2)/2; i++) {
      arr[i] = this.images[count];
      count++;
      if (count >= this.images.length) {
          count = 0;
      } 
    }
    let result = arr.concat(arr);

    return result;
  }

   private createRandomImage(array):any[] {           //random order in array
    return array.sort(function() {
        return 0.5 - Math.random();
    });
  }
  
  public createTable(size):any[][] {                     //create double array
    let current = this.createArray(size);
    let currentArray = this.createRandomImage(current);
    let matrix = [[]];
    let count = 0;
    for (let i = 0; i < size; i++) {
      matrix[i] = [];
      for (let j = 0; j < size; j++) {
        matrix[i][j] = currentArray[count];
        count++;
      }
    }
    return matrix;
  }
  // _____________________________________________________
  public setDiffClassForLevel(level) {                        //set different class to element dependent on level
     if (level == 2) {
        this.hideClass = "hide";
        this.activeClass = "active";     
    }
    else {
        this.hideClass = "hideBlock";
        this.activeClass = "activeBlock";
    }
  }

   public addClassHide():void {
      this.currentOpened[0].parentElement.parentElement.classList.add(this.hideClass); // to do opacity:0 for td (td->div->img)
      this.currentOpened[1].parentElement.parentElement.classList.add(this.hideClass); // to do opacity:0 for td (td->div->img)
      this.countHiddenBlock++;
  }

  public resetSettings():void {
      this.currentOpened[0].classList.remove(this.activeClass);
      this.currentOpened[1].classList.remove(this.activeClass);
      this.currentOpened = [];
  }

   public areYouWin(size, isTimerTick):boolean {
     if (this.countHiddenBlock === Math.pow(size,2) /2  && isTimerTick){
      this.countHiddenBlock = 0;
      this.currentOpened = [];
      return true;
    }
    return false;
  }

  public getActiveClass():string {
   return  this.activeClass;
  }

  public setCountHiddenBlock(value:number):void {
    this.countHiddenBlock = value;
  }

  public setCurrentOpened(value:any[]):void {
    this.currentOpened = value;
  }

  public getLengthCurrentOpened():number {
   return this.currentOpened.length;
  }
  public pushElementInCurrentOpened(elem:any) {
    this.currentOpened.push(elem);
  }

  public getFirstElementNameCurOpened():string {
    return this.currentOpened[0].name;
  }
  public getLastElementNameCurOpened():string {
    return this.currentOpened[1].name;
  }

  public getClassList(){
    return this.currentOpened[0].classList.toString();
  }

}