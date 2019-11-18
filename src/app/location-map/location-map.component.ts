import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {SportsClassService} from '../sportsClasses.service';
import {first} from 'rxjs/operators';
import {latLng, Layer, marker, tileLayer} from 'leaflet';
import {Location, SportsClass} from '../models';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon.png';


@Component({
  selector: 'unisport-location-map',
  templateUrl: './location-map.component.html',
  styleUrls: ['./location-map.component.sass'],
})

export class LocationMapComponent implements OnInit {
  locations: Location[];
  errorMessage: string;
  layers: Layer[];

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      })
    ],
    zoom: 10,
    center: latLng(52.5135, 13.3913)
  };
  location: Location;
  classes: SportsClass[];

  constructor(
    private sportsClassService: SportsClassService,
    private changeDetectorRef: ChangeDetectorRef,
    private zone: NgZone
  ) {
  }

  ngOnInit() {
    this.sportsClassService.getLocations()
      .pipe(first())
      .subscribe(
        locations => {
          this.locations = locations;
          this.layers = locations.map(l =>
            marker([l.lat, l.lon] )
              .on('click', () =>
                this.zone.run(() => this.onMarkerClick(l))
              )
          );
        },
        error => this.errorMessage = error as any
      );
  }

  onMarkerClick(location: Location) {
    this.location = location;
    this.sportsClassService.getSportsClasses({location: location.name})
      .pipe(first())
      .subscribe(
        classes => {
          this.classes = classes;
          this.changeDetectorRef.detectChanges();
        },
        error => this.errorMessage = error as any
      );
  }
}
