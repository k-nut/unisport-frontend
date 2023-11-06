import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {LocationMapComponent} from './location-map.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs/internal/observable/of';
import {SportsClassService} from '../sportsClasses.service';

describe('LocationMapComponent', () => {
  let component: LocationMapComponent;
  let fixture: ComponentFixture<LocationMapComponent>;

  beforeEach(waitForAsync(() => {
    const sportsClassesStub = {
      getLocations: () => of([])
    };

    TestBed.configureTestingModule({
      declarations: [LocationMapComponent],
      imports: [LeafletModule, RouterTestingModule],
      providers: [
        {provide: SportsClassService, useValue: sportsClassesStub},
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
