import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CardsComponent } from './cards/cards.component';
import { TimerComponent } from './timer/timer.component';
import { LivesComponent } from './lives/lives.component';

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    TimerComponent,
    LivesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
