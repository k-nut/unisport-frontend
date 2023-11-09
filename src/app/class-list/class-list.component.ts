import { Component, OnInit } from '@angular/core';
import {SportsClassService} from '../sportsClasses.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'unisport-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.sass']
})
export class ClassListComponent implements OnInit {
  classes: string[];

  constructor(private sportsClassService: SportsClassService) { }

  ngOnInit() {
    this.sportsClassService.getNames()
      .pipe(first())
      .subscribe(
        names => {
          this.classes = names.sort().filter((name, index) => names.indexOf(name) === index);
        },
      );
  }

}
