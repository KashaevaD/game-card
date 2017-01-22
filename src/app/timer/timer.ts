export interface Timer{
    time: number;                          //set time
  	timerId:any;
  	isTimerTick: boolean;          //is timer start? output variable from cards
  	chekedTime: boolean;                   //if you are win = true, or if you are lost = false
  	saveLive:boolean;
 }
