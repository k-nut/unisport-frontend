import {Component, OnInit} from '@angular/core';
import * as _ from "lodash";

import {SportsClassService} from "./sportsClasses.service"
import {SportsClass} from "./sportsClass";
import {ResultsAgeService} from "./resultsAge.service";



export class Day {
  name: string;
  selected: boolean;

  constructor(name: string) {
    this.name = name;
    this.selected = false;
  }
}


@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['main.component.sass'],
  providers: [SportsClassService, ResultsAgeService]
})

export class MainComponent implements OnInit {
  errorMessage: string;
  pagingStart: number;
  days = [
    new Day("Mo"),
    new Day("Di"),
    new Day("Mi"),
    new Day("Do"),
    new Day("Fr"),
    new Day("Sa"),
    new Day("So"),
  ];
  searchTerm = "Handball";
  sportsClasses: SportsClass[];
  pages: number[];
  currentPage: number;
  pagination = {
    start: 1,
    end: 10
  };
  bookable: string = "false";
  classes: SportsClass[];
  lastUpdated: Date;

  constructor(private sportsClassService: SportsClassService, private resultsAgeService: ResultsAgeService) {
  }

  setPage(page){
    this.currentPage = page;
    this.pagingStart = (page - 1) * 10;

    const offset = (this.currentPage - 1) * 10;
    const lastResult = offset + 10;
    this.pagination.start = offset + 1;
    this.pagination.end = lastResult > this.sportsClasses.length ? this.sportsClasses.length : lastResult
  }


  getSportsClasses() {
    const selectedDays = _.filter(this.days, 'selected');
    this.sportsClassService.getSportsClasses(this.searchTerm, this.bookable, selectedDays)
      .subscribe(
        sportsClasses => {
          this.sportsClasses = sportsClasses;
          this.pages = _.range(1, Math.ceil(sportsClasses.length / 10) + 1);
          this.setPage(1)
        },
        error => this.errorMessage = <any>error);
  }

  ngOnInit() {
    this.sportsClasses =[];
    this.pagingStart = 0;
    this.getSportsClasses();
    this.pages = _.range(1, 10);
    this.currentPage = 1;
    this.sportsClassService.getSportsClasses('')
      .subscribe(
        sportsClasses => {
          this.classes = sportsClasses;
        },
        error => this.errorMessage = <any>error
      );
    this.resultsAgeService.getAge().subscribe(age => {
      this.lastUpdated = age
    })
  }


}
