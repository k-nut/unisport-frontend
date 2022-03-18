import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import {MainComponent} from './main-module/main.component';
import {FaqComponent} from './faq/faq.component';
import {ImprintComponent} from './imprint/imprint.component';
import {MainModule} from './main-module/main.module';
import { ClassListComponent } from './class-list/class-list.component';
import { LocationMapComponent } from './location-map/location-map.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {ContentfulService} from './contentful.service';

@NgModule({
  declarations: [
    AppComponent,
    FaqComponent,
    ImprintComponent,
    ClassListComponent,
    LocationMapComponent,
  ],
  imports: [
    BrowserModule,
    MainModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LeafletModule.forRoot(), // TODO: Create separete map module? Does this create a new bundle and improve load time?
    RouterModule.forRoot([
    {
        path: 'classes',
        component: MainComponent
    },
    {
        path: 'class-list',
        component: ClassListComponent
    },
    {
        path: 'map',
        component: LocationMapComponent,
    },
    {
        path: 'faq',
        component: FaqComponent
    },
    {
        path: 'imprint',
        component: ImprintComponent
    },
    { path: '',
        redirectTo: '/classes',
        pathMatch: 'full' },
], { relativeLinkResolution: 'legacy' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
