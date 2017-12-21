import {Component, Input, OnInit} from '@angular/core';
import {SportsClass} from "../models";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'sports-class',
  template: `
  <h2> {{ sportsClass.name }} </h2>

  <a class="resultLink" href="{{ sportsClass.url }}"> {{ sportsClass.url | slice:0:60}}... </a>

  <button (click)="sportsClass.toggleVisibility()">Beschreibung anzeigen</button>

  <p class="details"
     [myHighlight]="searchTerm"
     [text]="sportsClass.description"
     *ngIf="sportsClass.showDescription"
     [@fadeInOut]></p>

  <div class="tableContainer">
    <table>
      <colgroup>
        <col style="width: 20%">
        <col style="width: 10%">
        <col style="width: 10%">
        <col style="width: 10%">
        <col style="width: 10%">
        <col style="width: 10%">
        <col style="width: 10%">
      </colgroup>
      <thead>
      <tr>
        <th>Name</th>
        <th>Tag</th>
        <th>Zeit</th>
        <th>Zeitraum</th>
        <th>Ort</th>
        <th>Preis</th>
        <th>Buchbar</th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor='let course of sportsClass.courses'>
        <td> {{course.name }}</td>
        <td> {{course.day }}</td>
        <td> {{course.time }}</td>
        <td> {{course.startDate}}-{{course.endDate}}</td>
        <td> {{course.place }}</td>
        <td> {{course.price }}</td>
        <td> {{course.bookable }}</td>
      </tr>
      </tbody>
    </table>
  </div>
  `,
  styleUrls: ['./sports-class.component.sass'],
  animations: [
    trigger('fadeInOut', [
      state('*', style({ 'overflow-y': 'hidden' })),
      state('void', style({ 'overflow-y': 'hidden' })),
      transition(':enter', [   // :enter is alias to 'void => *'
        style({height:0}),
        animate(250, style({height:'*'}))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(250, style({height:0}))
      ])
    ])
  ]
})
export class SportsClassComponent implements OnInit {
  @Input() sportsClass: SportsClass;
  @Input() searchTerm: string;

  constructor() { }

  ngOnInit() {
  }

}


