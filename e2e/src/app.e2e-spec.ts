import { UnisportFrontendPage } from './app.po';

describe('unisport-frontend App', () => {
  let page: UnisportFrontendPage;

  beforeEach(() => {
    page = new UnisportFrontendPage();
  });

  it('should have a aria label for the heading svg', () => {
    page.navigateTo();
    expect(page.getHeadingAriaLabel()).toEqual('unisport.berlin');
  });
});
