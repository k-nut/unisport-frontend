import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';

import {RouterTestingModule} from '@angular/router/testing';
import {MainComponent} from './main.component';
import {SportsClassService} from '../sportsClasses.service';
import {of} from 'rxjs';
import {PiwikService} from '../piwik.service';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Router} from '@angular/router';
import {AppModule} from '../app.module';

describe('MainComponent', () => {
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(waitForAsync(() => {
    const sportsClassesStub = {
      getSportsClasses: () => of([{name: 'Handball', description: 'Handball description'}]),
      getNames: () => of(['Kicker', 'Judo', 'Tennis'])
    };
    const piwikStub = {
      trackSiteSearch: () => null,
    };

    TestBed.configureTestingModule({
      declarations: [MainComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        {provide: SportsClassService, useValue: sportsClassesStub},
        {provide: PiwikService, useValue: piwikStub},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
  }));

  it('should create the app', waitForAsync(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should create an input element', waitForAsync(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('input')).toBeTruthy();
  }));

  it('should add class names to datalist', waitForAsync(() => {
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
