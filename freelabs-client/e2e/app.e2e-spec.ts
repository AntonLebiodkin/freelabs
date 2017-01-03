import { FreelabsPage } from './app.po';

describe('freelabs App', function() {
  let page: FreelabsPage;

  beforeEach(() => {
    page = new FreelabsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
