import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CardsComponent } from './cards/cards.component';
import { TimerComponent } from './timer/timer.component';
import { LivesComponent } from './lives/lives.component';
import { LevelComponent } from './level/level.component';
import { WinOrLostComponent } from './win-or-lost/win-or-lost.component';

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    TimerComponent,
    LivesComponent,
    LevelComponent,
    WinOrLostComponent
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
