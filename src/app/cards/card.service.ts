import { Injectable } from '@angular/core';

@Injectable()
export class CardService {

  constructor( ) { }

  private images:{src:string, id:number, isOpen:boolean,isHidden:boolean}[]  = [                             //images in table
    {
      src: 'assets/img/0.jpg',
      id: 0,
      isOpen: false,
      isHidden: false
    },
    {
      src: 'assets/img/1.jpg',
      id: 1,
      isOpen: false,
      isHidden: false
    }
    // {
    //   src: 'assets/img/2.jpg',
    //   id: 2,
    //   isOpen: false,
    //   isHidden: false
    // },
    // {
    //   src: 'assets/img/3.jpg',
    //   id: 3,
    //   isOpen: false,
    //   isHidden: false
    // }
  ];

  private currentOpened: any[] = [];                //current opened image
  private hideClass:string;                         //variable for hide class
  private activeClass:string;                       //variable for active class
  private countHiddenBlock: number = 0;             //count of hidden block, need to count disappeared pair image to choose the win or not


  private createArray(size):any[] {                       //create array with img
    let arr = [];
    let count = 0;

    for (let i = 0; i < Math.pow(size,2); i++) {
      arr.push({
        src: this.images[count].src,
        id: i,
        isOpen: this.images[count].isOpen,
        isHidden: this.images[count].isHidden,
      });
      count++;
      if (count >= this.images.length) {
          count = 0;
      } 
    }
    // let result = arr.concat(arr);

    return arr;
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
 
}