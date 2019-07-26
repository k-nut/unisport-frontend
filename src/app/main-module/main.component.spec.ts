import {TestBed, async, ComponentFixture, tick} from '@angular/core/testing';

import {RouterTestingModule} from '@angular/router/testing';
import {MainComponent} from './main.component';
import {FormsModule} from '@angular/forms';
import {SportsClassService} from '../sportsClasses.service';
import {ResultsAgeService} from '../resultsAge.service';
import {of} from 'rxjs';
import {PiwikService} from '../piwik.service';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AppModule} from '../app.module';
import {MainModule} from './main.module';
import {ActivatedRoute, Router} from '@angular/router';

describe('MainComponent', () => {
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    const sportsClassesStub = {
      getSportsClasses: () => of([{name: 'Handball', description: 'Handball description'}]),
      getNames: () => of(['Kicker', 'Judo', 'Tennis'])
    };
    const ageStub = {
      getAge: () => of(new Date()),
    };
    const piwikStub = {
      trackSiteSearch: () => null,
    };

    TestBed.configureTestingModule({
      imports: [
        MainModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        {provide: SportsClassService, useValue: sportsClassesStub},
        {provide: ResultsAgeService, useValue: ageStub},
        {provide: PiwikService, useValue: piwikStub},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
  }));

  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should create an input element', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('input')).toBeTruthy();
  }));

  it('should add class names to datalist', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('datalist option').length).toBe(3);
  }));

  it('should load parameters from url', async () => {
    const router = TestBed.get(Router);
    await router.navigate([], {queryParams: {searchTerm: 'Judo'}});
    fixture.detectChanges();
    expect(fixture.componentInstance.searchTerm).toEqual('Judo');
  });
});
