import 'core-js/stable';
import 'regenerator-runtime/runtime';

const timeout = process.env.SLOWMO ? 60000 : 30000;

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

    await page.waitForSelector('.jumbotron .welcome-user');
    const welcomeUser = await page.$('.jumbotron .welcome-user');
    const welcomeUserContent = await page.evaluate(welcomeUser => welcomeUser.innerText, welcomeUser);

    expect(welcomeUserContent).toMatch('Hello, users!');

    await page.click('.browsing-btn');

    // Since user is not logged in, users should see the please log in
    await page.waitForSelector('.book-shelf-container .no-user-logged-in');
    const userNotLoggedIn = await page.$('.book-shelf-container .no-user-logged-in');
    await page.hover('.book-shelf-container .no-user-logged-in');
    const userNotLoggedInContent = await page.evaluate(userNotLoggedIn => userNotLoggedIn.innerText, userNotLoggedIn);

    expect(userNotLoggedInContent).toMatch('For personalized experience, please log in.');

    // make sure that there are more than 1 book
    await page.waitForSelector('.book-list-item-container button');
    await page.hover('.book-list-item-container button');
    const bookListItemButtons = await page.$$('.book-list-item-container button');

    expect(bookListItemButtons.length > 0).toBe(true);
  }, timeout);
});
