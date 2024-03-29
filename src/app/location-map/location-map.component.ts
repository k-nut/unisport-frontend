import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {SportsClassService} from '../sportsClasses.service';
import {first} from 'rxjs/operators';
import {icon, latLng, Layer, marker, tileLayer} from 'leaflet';
import {Location, SportsClass} from '../models';


@Component({
  selector: 'unisport-location-map',
  templateUrl: './location-map.component.html',
  styleUrls: ['./location-map.component.sass'],
})

export class LocationMapComponent implements OnInit {
  locations: Location[];
  layers: Layer[];

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
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
            marker([l.lat, l.lon], {
              icon: icon({
                iconSize: [25, 41],
                iconAnchor: [13, 41],
                iconUrl: '/assets/leaflet/marker-icon.png',
                shadowUrl: '/assets/leaflet/marker-shadow.png',
              })
            })
              .on('click', () =>
                this.zone.run(() => this.onMarkerClick(l))
              )
          );
        },
      );
  }

  onMarkerClick(location: Location) {
    this.location = location;
    this.sportsClassService.getSportsClasses({locationUrl: location.url})
      .pipe(first())
      .subscribe(
        classes => {
          this.classes = classes;
          this.changeDetectorRef.detectChanges();
        },
      );
  }
}
