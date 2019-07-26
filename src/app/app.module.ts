import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import {MainComponent} from './main-module/main.component';
import {AboutComponent} from './about.component';
import {ImprintComponent} from './imprint.component';
import {MainModule} from './main-module/main.module';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ImprintComponent,
  ],
  imports: [
    BrowserModule,
    MainModule,
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
