import { BulkOrdersDashboardPage } from './app.po';

describe('bulk-orders-dashboard App', function() {
  let page: BulkOrdersDashboardPage;

  beforeEach(() => {
    page = new BulkOrdersDashboardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
