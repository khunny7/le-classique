import 'core-js/stable';
import 'regenerator-runtime/runtime';
import PageElement from './tapi/page-element';

const timeout = 60000;

beforeAll(async () => {
  await page.goto('http://localhost:8080', { waitUntil: 'domcontentloaded' });
  await page.setViewport({
    width: 1440,
    height: 800,
    deviceScaleFactor: 1,
  });
});

describe('Dashboard page navigation', () => {
  test('Title of the page', async () => {
    const title = await page.title();
    expect(title).toBe('Getting Started 2');

    const welcomeUser = new PageElement(page, '.jumbotron .welcome-user');
    const welcomeUserContent = await welcomeUser.getTextAsync();
    expect(welcomeUserContent).toMatch('Hello, users!');

    await page.click('.browsing-btn');

    // make sure that there are more than 1 book
    await page.waitForSelector('.book-list-item-container button');
    await page.hover('.book-list-item-container button');
    const bookListItemButtons = await page.$$('.book-list-item-container button');

    expect(bookListItemButtons.length > 0).toBe(true);
  }, timeout);
});
