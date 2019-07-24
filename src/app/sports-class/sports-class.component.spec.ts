import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsClassComponent } from './sports-class.component';
import {HighlightDirective} from '../highlight.directive';
import {SportsClass} from '../models';

describe('SportsClassComponent', () => {
  let component: SportsClassComponent;
  let fixture: ComponentFixture<SportsClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighlightDirective, SportsClassComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportsClassComponent);
    component = fixture.componentInstance;
    component.sportsClass = {} as SportsClass;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
