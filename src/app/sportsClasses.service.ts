import { Injectable }              from '@angular/core';
import {HttpClient, HttpResponse, HttpParams, HttpErrorResponse} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {SportsClass, Day, ISportsClassResponse} from "./models";

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

@Injectable()
export class SportsClassService {
  private baseUrl = 'https://backend.unisport.berlin'
  private sportsClassUrl = `${this.baseUrl}/classes`;
  private namesUrl = `${this.baseUrl}/names`;

  constructor (private http: HttpClient) { }

  getSportsClasses(name:string, bookable:string = "false", selectedDays:Day[] = []): Observable<SportsClass[]> {
    let params: HttpParams = new HttpParams({encoder: new WebHttpUrlEncodingCodec() });
    params = params.set('name', name);
    if (bookable !== "false"){
      params = params.set('bookable', bookable)
    }
    if (selectedDays.length) {
      const dayList = selectedDays.map(day => day.name).join(',');
      params = params.set('days', dayList)
    }
    return this.http.get<ISportsClassResponse>(this.sportsClassUrl, {params})
      .map(this.extractData)
      .catch(this.handleError);
  }

  getNames(){
    return this.http.get<{data: string[]}>(this.namesUrl)
      .map(json => json.data)
      .catch(this.handleError);
  }

  private extractData(json: ISportsClassResponse) {
    return json.data.map(sc => new SportsClass(sc)) || { };
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
}
