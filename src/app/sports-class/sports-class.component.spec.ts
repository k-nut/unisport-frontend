import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsClassComponent } from './sports-class.component';

describe('SportsClassComponent', () => {
  let component: SportsClassComponent;
  let fixture: ComponentFixture<SportsClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportsClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportsClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
