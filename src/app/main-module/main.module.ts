import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {FormsModule} from '@angular/forms';
import {SportsClassComponent} from '../sports-class/sports-class.component';
import {HighlightDirective} from '../highlight.directive';
import {HttpClientModule} from '@angular/common/http';
import {SportsClassService} from '../sportsClasses.service';
import {PiwikService} from '../piwik.service';

@NgModule({
  declarations: [
    SportsClassComponent,
    MainComponent,
    HighlightDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [SportsClassService, PiwikService],
  exports: [
    MainComponent
  ]
})
export class MainModule {
}
