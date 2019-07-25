import { UnisportFrontendPage } from './app.po';

describe('unisport-frontend App', () => {
  let page: UnisportFrontendPage;

  beforeEach(() => {
    page = new UnisportFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Berliner Unisport');
  });
});
