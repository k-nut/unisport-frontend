import { Injectable } from '@angular/core';

function getWindow (): Window {
  return window;
}

@Injectable()
export class PiwikService {

  trackSiteSearch(term, numberOfResults) {
    const window = getWindow();
    window["_paq"].push(['trackSiteSearch',
      term,
      false,
      numberOfResults
    ]);
  }
}
