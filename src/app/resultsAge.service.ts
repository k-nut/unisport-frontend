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
    return new Date(res.text());
  }

  private handleError (error: Response | any) {
    return Observable.throw("getting age failed")
  }
}
