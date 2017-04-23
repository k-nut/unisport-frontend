import {Component, OnInit} from '@angular/core';
import * as _ from "lodash";

import {SportsClassService} from "./sportsClasses.service"
import {SportsClass} from "./sportsClass";



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
  providers: [SportsClassService]
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

  constructor(private sportsClassService: SportsClassService) {
  }

  setPage(page){
    this.currentPage = page;
    this.pagingStart = (page - 1) * 10;
  }


  getSportsClasses() {
    const selectedDays = _.filter(this.days, 'selected')
    this.sportsClassService.getSportsClasses(this.searchTerm, this.bookable, selectedDays)
      .subscribe(
        sportsClasses => {
          this.sportsClasses = sportsClasses;
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
  }


}
