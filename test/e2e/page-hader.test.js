import 'core-js/stable';
import 'regenerator-runtime/runtime';
import PageHeaderTapi from './tapi/page-header-tapi';

const timeout = process.env.SLOWMO ? 60000 : 30000;

beforeAll(async () => {
  await page.goto('http://localhost:8080', { waitUntil: 'domcontentloaded' });
  await page.setViewport({
    width: 1440,
    height: 800,
    deviceScaleFactor: 1,
  });
});

describe('PageHeader Test', () => {
  test('Change language between English and korean', async () => {
    const pageHeader = new PageHeaderTapi(page);

    await pageHeader.verifyLoadedAsync();

    let localButtonText = await pageHeader.getLocaleButton().getTextAsync();
    expect(localButtonText).toBe('한국어');

    await pageHeader.getLocaleButton().clickAsync();
    // wait one second before checking the language change

    localButtonText = await pageHeader.getLocaleButton().getTextAsync();
    expect(localButtonText).toBe('English');
  }, timeout);

  test('Navigate to managed books and come back', async () => {
    const pageHeader = new PageHeaderTapi(page);

    await pageHeader.verifyLoadedAsync();
    const manageBooksLink = await pageHeader.getManageBooksLink();
    await manageBooksLink.clickAsync();

    // now should navigate to the books manage container
    await page.waitForSelector('.books-manager-container');

    // should be able to go back to the dashboard
    await page.goBack();

    // now should be on the dashboard
    await page.waitForSelector('.dashboard-container');
  }, timeout);
});
