import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import {BookingStatus, SportsClassService} from '../sportsClasses.service';
import {Day, SportsClass} from '../models';
import {PiwikService} from '../piwik.service';
import {first} from 'rxjs/operators';


@Component({
  selector: 'unisport-root',
  templateUrl: './main.component.html',
  styleUrls: ['main.component.sass'],
})

export class MainComponent implements OnInit, OnDestroy {
  errorMessage: string;
  pagingStart: number;
  days = [
    new Day('Mo'),
    new Day('Di'),
    new Day('Mi'),
    new Day('Do'),
    new Day('Fr'),
    new Day('Sa'),
    new Day('So'),
  ];
  searchTerm = '';
  sportsClasses: SportsClass[];
  pages: number[];
  currentPage: number;
  pagination = {
    start: 1,
    end: 10
  };
  bookable: BookingStatus = BookingStatus.all;
  BookingStatus: typeof BookingStatus = BookingStatus;
  classes: string[];
  loading = false;
  hasData = false;
  private sub: Subscription;

  constructor(private sportsClassService: SportsClassService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private piwikService: PiwikService) {
  }

  setPage(page) {
    this.currentPage = page;
    this.pagingStart = (page - 1) * 10;

    const offset = (this.currentPage - 1) * 10;
    const lastResult = offset + 10;
    this.pagination.start = offset + 1;
    this.pagination.end = lastResult > this.sportsClasses.length ? this.sportsClasses.length : lastResult;
  }

  updateUrlParams(selectedDays = []) {
    const params = {
      searchTerm: this.searchTerm,
      selectedDays: selectedDays.map(day => day.name),
      bookable: this.bookable,
    };
    this.router.navigate([], {
      queryParams: params,
      relativeTo: this.activatedRoute
    });
  }


  getSportsClasses() {
    if (this.searchTerm === '') {
      this.hasData = false;
      return;
    }
    const selectedDays = this.days.filter(day => day.selected);
    this.updateUrlParams(selectedDays);
    this.loading = true;
    this.sportsClassService.getSportsClasses({
      name: this.searchTerm,
      bookable: this.bookable,
      days: selectedDays
    })
      .subscribe(
        sportsClasses => {
          this.sportsClasses = sportsClasses;
          const limit = Math.ceil(sportsClasses.length / 10);
          this.pages = [...Array(limit).keys()].map(x => x + 1);
          this.hasData = sportsClasses.length > 0;
          this.loading = false;
          this.piwikService.trackSiteSearch(this.searchTerm, sportsClasses.length);
          this.setPage(1);
        },
        error => this.errorMessage = error as any);
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap
      .pipe(first())
      .subscribe((params) => {
      this.searchTerm = params.get('searchTerm') || this.searchTerm;
      this.bookable = params.get('bookable') as BookingStatus || this.bookable;
      const selectedDays = params.getAll('selectedDays');
      this.days = this.days.map(day => {
        return {
          ...day,
          selected: selectedDays.includes(day.name)
        };
      });
    });
    this.sportsClasses = [];
    this.pagingStart = 0;
    this.getSportsClasses();
    this.pages = [...Array(10).keys()].map(i => i + 1);
    this.currentPage = 1;
    this.sportsClassService.getNames()
      .pipe(first())
      .subscribe(
        names => {
          this.classes = names.sort();
        },
        error => this.errorMessage = error as any
      );
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
