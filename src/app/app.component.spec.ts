import { TestBed, waitForAsync } from '@angular/core/testing';

import { AppComponent } from './app.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      imports: [
        RouterTestingModule,
      ]
    }).compileComponents();
  }));

  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render logo in a h1 tag', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1 svg').getAttribute('aria-label')).toEqual('unisport.berlin');
  }));
});
