import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import {SportsClassService} from './sportsClasses.service';
import {SportsClass, Day} from './models';
import {ResultsAgeService} from './resultsAge.service';
import {PiwikService} from './piwik.service';



@Component({
  selector: 'unisport-root',
  templateUrl: './main.component.html',
  styleUrls: ['main.component.sass'],
  providers: [SportsClassService, ResultsAgeService, PiwikService],
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
  searchTerm = 'Handball';
  sportsClasses: SportsClass[];
  pages: number[];
  currentPage: number;
  pagination = {
    start: 1,
    end: 10
  };
  bookable = 'false';
  classes: string[];
  lastUpdated: Date;
  private sub: Subscription;

  constructor(private sportsClassService: SportsClassService,
              private resultsAgeService: ResultsAgeService,
              private route: ActivatedRoute,
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
    const params = {};
    if (this.searchTerm) {
      params['searchTerm'] = this.searchTerm;
    }
    if (selectedDays.length) {
      params['selectedDays'] = selectedDays.map(day => day.name)
    }
    if (this.bookable !== 'false') {
      params['bookable'] = this.bookable
    }
    this.router.navigate([], {
      queryParams: params,
      relativeTo: this.route
    });
  }


  getSportsClasses() {
    const selectedDays = this.days.filter(day => day.selected);
    this.updateUrlParams(selectedDays);
    this.sportsClassService.getSportsClasses(this.searchTerm, this.bookable, selectedDays)
      .subscribe(
        sportsClasses => {
          this.sportsClasses = sportsClasses;
          const limit = Math.ceil(sportsClasses.length / 10);
          this.pages = [...Array(limit).keys()].map(x => x + 1);
          this.piwikService.trackSiteSearch(this.searchTerm, sportsClasses.length);
          this.setPage(1);
        },
        error => this.errorMessage = error as any);
  }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe((params: Params) => {
      if (params['searchTerm']) {
        this.searchTerm = params['searchTerm']
      }
      if (params['selectedDays']) {
        const days = params['selectedDays'].split(',')
        days.forEach((day) => {
          this.days.find(d => d.name === day).selected = true;
        });
      }
      if (params['bookable']) {
        this.bookable = params['bookable']
      }
    });
    this.sportsClasses = [];
    this.pagingStart = 0;
    this.getSportsClasses();
    this.pages = [...Array(10).keys()].map(i => i + 1);
    this.currentPage = 1;
    this.sportsClassService.getNames()
      .subscribe(
        names => {
          this.classes = names.sort();
        },
        error => this.errorMessage = error as any
      );
    this.resultsAgeService.getAge().subscribe(age => {
      this.lastUpdated = age;
    });
  }

  ngOnDestroy() {
    if (this.sub){
      this.sub.unsubscribe();
    }
  }
}
