import { ReflectiveInjector} from '@angular/core';
import { fakeAsync, tick} from '@angular/core/testing';
import {BaseRequestOptions, ConnectionBackend, Http, RequestOptions} from '@angular/http';
import {Response, ResponseOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {ResultsAgeService} from "./resultsAge.service";
describe('MockBackend HeroService Example', () => {
  beforeEach(() => {
    this.injector = ReflectiveInjector.resolveAndCreate([
      {provide: ConnectionBackend, useClass: MockBackend},
      {provide: RequestOptions, useClass: BaseRequestOptions},
      Http,
      ResultsAgeService,
    ]);
    this.resultsAgeService = this.injector.get(ResultsAgeService);
    this.backend = this.injector.get(ConnectionBackend) as MockBackend;
    this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
  });
  it('getAge() should call /age url and parse date', fakeAsync(() => {
    this.resultsAgeService.getAge();
    expect(this.lastConnection.request.url).toMatch(/\/age$/);
  }));

  it('getAge() should parse date', fakeAsync(() => {
    let result: Date;
    this.resultsAgeService.getAge().subscribe((age: Date) => result = age);
    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: '2016-04-07 12:00:00.1234',
    })));
    tick();
    expect(result.getDate()).toEqual(7);
    expect(result.getFullYear()).toEqual(2016);
    expect(result.getMonth()).toEqual(3);
  }));
});
