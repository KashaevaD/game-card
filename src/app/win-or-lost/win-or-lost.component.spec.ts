/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WinOrLostComponent } from './win-or-lost.component';

describe('WinOrLostComponent', () => {
  let component: WinOrLostComponent;
  let fixture: ComponentFixture<WinOrLostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinOrLostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinOrLostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
