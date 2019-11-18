import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse, HttpParams, HttpErrorResponse} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {SportsClass, Day, ISportsClassResponse, Location} from './models';

import {HttpParameterCodec} from '@angular/common/http'

/**
 * A `HttpParameterCodec` that uses `encodeURIComponent` and `decodeURIComponent` to
 * serialize and parse URL parameter keys and values.
 *
 * @stable
 */
export class WebHttpUrlEncodingCodec implements HttpParameterCodec {
  encodeKey(k: string): string { return encodeURIComponent(k); }

  encodeValue(v: string): string { return encodeURIComponent(v); }

  decodeKey(k: string): string { return decodeURIComponent(k); }

  decodeValue(v: string) { return decodeURIComponent(v); }
}

export enum BookingStatus {
  all = 'false',
  bookable = 'true',
  withWaitList = 'waitingList'
}

export interface ISearchOptions {
  name?: string;
  location?: string;
  bookable?: BookingStatus;
  days?: Day[];
}

@Injectable()
export class SportsClassService {
  private baseUrl = 'https://backend.unisport.berlin'
  private sportsClassUrl = `${this.baseUrl}/classes`;
  private namesUrl = `${this.baseUrl}/names`;
  private locationsUrl =  `${this.baseUrl}/locations`;

  constructor(private http: HttpClient) { }

  getSportsClasses(options: ISearchOptions = {bookable: BookingStatus.all}): Observable<SportsClass[]> {
    let params: HttpParams = new HttpParams({encoder: new WebHttpUrlEncodingCodec() });
    if (options.name) {
      params = params.set('name', options.name);
    }
    if (options.bookable && options.bookable !== BookingStatus.all) {
      params = params.set('bookable', options.bookable);
    }
    if (options.days && options.days.length) {
      const dayList = options.days.map(day => day.name).join(',');
      params = params.set('days', dayList);
    }
    if (options.location) {
      params = params.set('location', options.location);
    }
    return this.http.get<ISportsClassResponse>(this.sportsClassUrl, {params})
      .map(this.extractData)
      .catch(this.handleError);
  }

  getNames() {
    return this.http.get<{data: string[]}>(this.namesUrl)
      .map(json => json.data)
      .catch(this.handleError);
  }

  private extractData(json: ISportsClassResponse) {
    return json.data.map(sc => new SportsClass(sc));
  }

  private handleError (error: HttpErrorResponse | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof HttpErrorResponse) {
      const err = error.error || JSON.stringify(error.error);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  getLocations() {
    return this.http.get<{data: Location[]}>(this.locationsUrl)
      .map(json => json.data)
      .catch(this.handleError);
  }
}
