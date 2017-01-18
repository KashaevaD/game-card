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
  
  


  isVisible():void {
    this.isStart = true;
  }

  checkSize(size):void {
    this.size = size;

    if (this.isNumeric(this.size)) {
      this.isOkSize= true;
      // this.createRandomImage();
      // this.rows = this.createRows();
      // this.cells = this.createRows();
     
    }

    else {
      alert("You input unnormal number");
    }
   
  }
  //_____________________________________________________________

 isNumeric(n:any) {
    return !isNaN(parseFloat(n)) && isFinite(n) && n > 1 && n < 9 && n % 2 === 0;
  }


  //_____________________________________________________________

}
