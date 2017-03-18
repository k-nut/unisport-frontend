import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {MainComponent} from "./main.component";
import {AboutComponent} from "./about.component";
import {ImprintComponent} from "./imprint.component";
import {HighlightDirective} from "./highlight.directive";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AboutComponent,
    ImprintComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
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
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
