import {Component, OnInit} from '@angular/core';

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
  title = 'app works!';
  errorMessage: string;
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

  constructor(private sportsClassService: SportsClassService) {
  }


  getSportsClasses() {
    this.sportsClassService.getSportsClasses()
      .subscribe(
        sportsClasses => {
          this.sportsClasses = sportsClasses
        },
        error => this.errorMessage = <any>error);
  }

  ngOnInit() {
    this.sportsClasses =[];
    this.getSportsClasses();
  }


}
