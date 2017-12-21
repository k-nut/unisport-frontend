import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {MainComponent} from "./main.component";
import {AboutComponent} from "./about.component";
import {ImprintComponent} from "./imprint.component";
import {HighlightDirective} from "./highlight.directive";
import { SportsClassComponent } from './sports-class/sports-class.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AboutComponent,
    ImprintComponent,
    HighlightDirective,
    SportsClassComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {
        path: 'classes',
        component: MainComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'imprint',
        component: ImprintComponent
      },
      { path: '',
        redirectTo: '/classes',
        pathMatch: 'full' },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
