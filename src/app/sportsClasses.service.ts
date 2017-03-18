import { Injectable }              from '@angular/core';
import {Http, Response, URLSearchParams}          from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { SportsClass } from "./sportsClass";

@Injectable()
export class SportsClassService {
  private sportsClassUrl = '//backend.unisport.berlin/classes';  // URL to web API

  constructor (private http: Http) { }

  getSportsClasses(name:string): Observable<SportsClass[]> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('name', name);
    return this.http.get(this.sportsClassUrl, {search: params})
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.map(sc => new SportsClass(sc)) || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
