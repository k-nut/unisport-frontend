import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ResultsAgeService {
  private ageUrl = 'https://backend.unisport.berlin/age';

  constructor (private http: HttpClient) { }

  getAge(): Observable<Date> {
    return this.http.get(this.ageUrl, {responseType: 'text'})
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res) {
    // we need to add the `T` so that safari can parse this date
    // unfortunately this leads to JS parsing this as a UTC time
    // where it really is local time...
    return new Date(res.replace(' ', 'T'));
  }

  private handleError (error: HttpErrorResponse | any) {
    console.log(error);
    return Observable.throw('getting age failed')
  }
}
