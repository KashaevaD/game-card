import { Injectable } from '@angular/core';

@Injectable()
export class TimerService  {
    private time: number;                          //set time
  	private timerId:any;
  	private isTimerTick: boolean;          //is timer start? output variable from cards
  	private chekedTime: boolean;                   //if you are win = true, or if you are lost = false
  	private saveLive:boolean;
	readonly oneSecond:number = 1000;

	public setTime(level, size):number {
	    if (level == 1) {

	      // if (size == 2) {
	      //    this.time = 6 * this.oneSecond;
	      // }
	      // else
		  if (size == 4) {
	        this.time = 40 * this.oneSecond;
	      }
	      else if (size == 6) {
	        this.time = 60 * this.oneSecond;
	      }
	      else if (size == 8) { 
	        this.time = 80 * this.oneSecond;
	      }

	    }
	    else if (level == 2) {

	      //  if (size == 2) {
	      //    this.time = 6 * this.oneSecond;
	      // }
	      // else
		  if (size == 4) {
	        this.time = 40 * this.oneSecond;
	      }
	      else if (size == 6) {
	        this.time = 70 * this.oneSecond;
	      }
	      else if (size == 8) {
	        this.time = 90 * this.oneSecond;
	      }

	    }
		return this.time;
	}

	public changeTime():any {

    	if (!this.time && !this.chekedTime) {
			clearInterval(this.timerId);
			this.isTimerTick = false;
			this.saveLive = false;    //pop image lives array
			return;
    	} else {
       		if (this.chekedTime && this.time) {
				clearInterval(this.timerId);
				this.isTimerTick = false;
				this.saveLive = true;  //savelive
				return;
        	}
			this.isTimerTick = true;
			this.time =  this.time - 1000;
			return this.time;
   		}
  	}

	public setIsTimerTick(value:boolean) {
		this.isTimerTick = value;
	}
	public getIsTimerTick():boolean {
		return this.isTimerTick;
	}

	public setChekedTime(value:boolean) {
		this.chekedTime = value;
	}
	public getChekedTime():boolean {
		return this.chekedTime;
	}
	
	public getCurrentTime():number {
		return this.time;
	}

	public getTime (level,size):void {
    	this.setTime(level,size);
    	this.timerId = setInterval (() => this.changeTime(), 1000);
  	}
	
	

}
