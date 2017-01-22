import { Injectable } from '@angular/core';
import {Timer} from "./timer/timer";

@Injectable()
export class TimerService {

 	constructor() { }
	// readonly oneSecond:number = 1000;

	// public setTime(level, size) {
	//     if (level == 1) {

	//       if (size == 2) {
	//          this.time = 6 * this.oneSecond;
	//       }
	//       else if (size == 4) {
	//         this.time = 30 * this.oneSecond;
	//       }
	//       else if (size == 6) {
	//         this.time = 50 * this.oneSecond;
	//       }
	//       else if (size == 8) { 
	//         this.time = 60 * this.oneSecond;
	//       }

	//     }
	//     else if (level == 2) {

	//        if (size == 2) {
	//          this.time = 6 * this.oneSecond;
	//       }
	//       else if (size == 4) {
	//         this.time = 30 * this.oneSecond;
	//       }
	//       else if (size == 6) {
	//         this.time = 60 * this.oneSecond;
	//       }
	//       else if (size == 8) {
	//         this.time = 80 * this.oneSecond;
	//       }

	//     }
	// }

}
