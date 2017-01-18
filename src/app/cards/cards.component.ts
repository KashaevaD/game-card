import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  @Input() size;
  @Input() show;
  game:string = "assets/img/game.jpg";
  image:string = "assets/img/0.png";
  click:boolean = false;

  images  = [
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

  data: {src:string, id:number}[][];

  count:number = 0;
  currentOpened: any[] = [];

  constructor() {

  }

  ngOnInit() {

  }

  getStart():void {
    this.click = true;
    this.show = false;
    this.data = this.createTable();
    console.log('result Array',this.data);
  }

  private createRandomImage(array):any[] {
    return array.sort(function() {
        return 0.5 - Math.random();
    });
  }

  private createTable():any[][] {
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

  private createArray():any[] {
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
  /*________________________________________________________*/
  addClassActive(i):void {
    if(this.count < 2) {
      let img = i.target.firstElementChild;
      this.currentOpened.push(img);
      img.classList.add("active");
      console.log(img.name);
      this.count++;
    }
    else {
      //for(let i = 0; i < this.currentOpened.length - 1; i++) {
        if (this.currentOpened[0].name === this.currentOpened[1].name) {
          this.currentOpened[0].parentElement.parentElement.classList.add("hide");
          this.currentOpened[1].parentElement.parentElement.classList.add("hide");
          this.currentOpened = [];
          // break;
        }
        else {
          this.currentOpened[0].classList.remove("active");
          this.currentOpened[1].classList.remove("active");
        }
      //}
      this.count = 0;
      this.currentOpened = [];
    }
    // if (this.currentOpened[0].name === this.currentOpened[i+1].name) {

    // }
    console.log('current');
    console.log(this.currentOpened);
  }

 }


