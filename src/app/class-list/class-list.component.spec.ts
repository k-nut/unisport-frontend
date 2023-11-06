import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClassListComponent } from './class-list.component';
import {RouterTestingModule} from '@angular/router/testing';
import {SportsClassService} from '../sportsClasses.service';
import {of} from 'rxjs/internal/observable/of';

describe('ClassListComponent', () => {
  let component: ClassListComponent;
  let fixture: ComponentFixture<ClassListComponent>;

  beforeEach(waitForAsync(() => {
    const sportsClassesStub = {
      getNames: () => of(['Kicker', 'Judo', 'Tennis'])
    };

    TestBed.configureTestingModule({
      declarations: [ ClassListComponent ],
      imports: [ RouterTestingModule, ],
      providers: [
        {provide: SportsClassService, useValue: sportsClassesStub},
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render links for the names', () => {
    const element = fixture.nativeElement;
    expect(element.querySelectorAll('ul li a').length).toBe(3);
  });
});
