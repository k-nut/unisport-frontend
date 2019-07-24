import {TestBed, async } from '@angular/core/testing';

import {RouterTestingModule} from '@angular/router/testing';
import {MainComponent} from './main.component';
import {FormsModule} from '@angular/forms';
import {SportsClassService} from './sportsClasses.service';
import {ResultsAgeService} from './resultsAge.service';
import {of} from 'rxjs';
import {PiwikService} from './piwik.service';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';


 describe('MainComponent', () => {
  beforeEach(async(() => {
    const sportsClassesStub = {
      getSportsClasses: () => of([{'name': 'Handball', description: 'Handball description'}]),
      getNames: () => of(['Kicker', 'Judo', 'Tennis'])
    };
    const ageStub = {
      getAge: () =>  of(new Date()),
    };
    const piwikStub = {
      trackSiteSearch: () =>  null,
    };

    TestBed.overrideComponent(MainComponent, {
      set: {
        providers: [
          { provide: SportsClassService, useValue: sportsClassesStub },
          { provide: ResultsAgeService, useValue: ageStub },
          { provide: PiwikService, useValue: piwikStub },
          ]
      }
    });

    TestBed.configureTestingModule({
      declarations: [MainComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'classes', component: MainComponent }
        ]),
        FormsModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(MainComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should create an input element', async(() => {
    const fixture = TestBed.createComponent(MainComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('input')).toBeTruthy()
  }));

  it('should add class names to datalist', async(() => {
    const fixture = TestBed.createComponent(MainComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('datalist option').length).toBe(3)
  }));
});
