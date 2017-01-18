import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  @Input() size;
  @Input() show;
  game:string = "assets/img/game.png";
  image:string = "assets/img/0.png";
  matrix;
  //cells:number[];
  images  = [
    {
      src: 'assets/img/0.png',
      id: 0
    },
    {
      src: 'assets/img/1.png',
      id: 1
    },
    {
      src: 'assets/img/2.png',
      id: 2
    },
    {
      src: 'assets/img/3.png',
      id: 3
    }
  ];

  click:boolean = false;
  constructor() { 
   
  }

  ngOnInit() {
     
  }

  getStart():void {
    this.click = true;
    this.show = false;
    this.createTable();
  }

  createRandomImage(array) {
    return array.sort(function() {
        return 0.5 - Math.random();
    });
  }
  
  createTable() {
    let current = this.createArray();
    let currentArray = this.createRandomImage(current);
   
    let count = 0;
    for (let i = 0; i < this.size; i++) {
      this.matrix[i] = [];
      for (let j = 0; j < this.size; j++) {
         this.matrix[i][j] = currentArray[count];
        count++;
      }
    }
    console.log( this.matrix);
  }

  createArray() {
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



}
