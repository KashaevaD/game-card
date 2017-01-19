import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  imgStart:string = 'assets/img/btn.png';
  isStart:boolean = false;
  size:number;
  isOkSize:boolean = false;

  level:string; 

  isLive:boolean = true;
  // hideAll:boolean = true;

  
  isVisible():void {
    this.isStart = true;
  }

  getSize(size, levelChoose):void {
    this.size = size;
    this.level = levelChoose;
    if (this.isNumeric(this.size)) {
      this.isOkSize= true; 
     
    }
    else {
      alert("You input unnormal number");
    }
  }

   isNumeric(n:any) {
      return !isNaN(parseFloat(n)) && isFinite(n) && n > 1 && n < 11 && n % 2 === 0;
  }

  isAlive(i:boolean) {
    this.isLive = false;
  }


}
