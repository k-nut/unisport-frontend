import {TestBed, async, tick} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {MainComponent} from "./main.component";
import {AppComponent} from "./app.component";
import {HighlightDirective} from "./highlight.directive";
import {FormsModule} from "@angular/forms";
import {SportsClassService} from "./sportsClasses.service";
import {ResultsAgeService} from "./resultsAge.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {Http} from "@angular/http";

class HeroDetailServiceSpy {
  getAge = jasmine.createSpy('getAge').and.callFake(
    () => Observable.of('10271')
  );
}


describe('MainComponent', () => {
  beforeEach(async(() => {
    const sportsClassesStub = {
      getSportsClasses: () => Observable.of([{'name': 'Handball', description: 'Handball description'}]),
      getNames: () => Observable.of(['Kicker', 'Judo', 'Tennis'])
    };
    const ageStub = {
      getAge: () =>  Observable.of(new Date()),
    };

    TestBed.overrideComponent(MainComponent, {
      set: {
        providers: [
          { provide: SportsClassService, useValue: sportsClassesStub },
          { provide: ResultsAgeService, useValue: ageStub },
          ]
      }
    });

    TestBed.configureTestingModule({
      declarations: [
        MainComponent,
        HighlightDirective,
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'classes', component: MainComponent }
        ]),
        FormsModule,
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(MainComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render title in a h1 tag', async(() => {
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
