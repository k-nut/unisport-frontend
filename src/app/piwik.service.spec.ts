import { TestBed, inject } from '@angular/core/testing';

import { PiwikService } from './piwik.service';

describe('PiwikService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PiwikService]
    });
  });

  it('should ...', inject([PiwikService], (service: PiwikService) => {
    expect(service).toBeTruthy();
  }));
});
