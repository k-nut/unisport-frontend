import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LocationMapComponent} from './location-map.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs/internal/observable/of';
import {ClassListComponent} from '../class-list/class-list.component';
import {SportsClassService} from '../sportsClasses.service';

describe('LocationMapComponent', () => {
  let component: LocationMapComponent;
  let fixture: ComponentFixture<LocationMapComponent>;

  beforeEach(async(() => {
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
