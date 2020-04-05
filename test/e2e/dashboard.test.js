import 'core-js/stable';
import 'regenerator-runtime/runtime';

const timeout = process.env.SLOWMO ? 60000 : 30000;

beforeAll(async () => {
  await page.setViewport({
    width: 1440,
    height: 800,
    deviceScaleFactor: 1,
  });
  await page.goto('http://localhost:8080', { waitUntil: 'domcontentloaded' });
});

describe('Dashboard page navigation', () => {
  test('Title of the page', async () => {
    const title = await page.title();
    expect(title).toBe('Getting Started 2');

    const welcomeUser = await page.$('.jumbotron .welcome-user');
    const welcomeUserContent = await page.evaluate(welcomeUser => welcomeUser.innerText, welcomeUser);

    expect(welcomeUserContent).toMatch('Hello, users!');

    await page.click('.browsing-btn');

    // Since user is not logged in, users should see the please log in 
    const userNotLoggedIn = await page.$('.user-book-list-container .no-user-logged-in');
    await page.hover('.user-book-list-container .no-user-logged-in');
    const userNotLoggedInContent = await page.evaluate(userNotLoggedIn => userNotLoggedIn.innerText, userNotLoggedIn);

    expect(userNotLoggedInContent).toMatch('For personalized experience, please log in.');
  }, timeout);
});
