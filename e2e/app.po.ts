import { browser, element, by } from 'protractor';

export class UnisportFrontendPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('unisport-root h1')).getText();
  }
}
