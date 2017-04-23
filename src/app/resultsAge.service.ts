import { Injectable }    from '@angular/core';
import {Http, Response}  from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ResultsAgeService {
  private ageUrl = 'https://backend.unisport.berlin/age';

  constructor (private http: Http) { }

  getAge(): Observable<Date> {
    return this.http.get(this.ageUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    // we need to add the `T` so that safari can parse this date
    // unfortunately this leads to JS parsing this as a UTC time
    // where it really is local time...
    return new Date(res.text().replace(" ", "T"));
  }

  private handleError (error: Response | any) {
    return Observable.throw("getting age failed")
  }
}
