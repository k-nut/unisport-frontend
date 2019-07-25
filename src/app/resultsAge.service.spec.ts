import {fakeAsync, getTestBed, TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {HttpTestingController} from '@angular/common/http/testing';
import {ResultsAgeService} from './resultsAge.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('MockBackend HeroService Example', () => {
  let httpTestingController: HttpTestingController;
  let resultsAgeService: ResultsAgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [ResultsAgeService]
    });
    resultsAgeService = TestBed.get(ResultsAgeService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('getAge() should call /age url  parse date', fakeAsync(() => {
    resultsAgeService.getAge().subscribe((age: Date) => {
      const result = age;
      expect(result.getDate()).toEqual(7);
      expect(result.getFullYear()).toEqual(2016);
      expect(result.getMonth()).toEqual(3);
    });
    const req = httpTestingController.expectOne('https://backend.unisport.berlin/age');
    expect(req.request.method).toBe('GET');
    req.flush('2016-04-07 12:00:00.1234')
  }));
});
