import 'core-js/stable';
import 'regenerator-runtime/runtime';

const timeout = process.env.SLOWMO ? 60000 : 30000;

const signInCredential = {
  id: 'piano8283test',
  password: 'Asdlkj96#',
};

beforeAll(async () => {
  await page.goto('http://localhost:8080', { waitUntil: 'domcontentloaded' });
  await page.setViewport({
    width: 1440,
    height: 800,
    deviceScaleFactor: 1,
  });
});

describe('Log-in and Log-out scenario', () => {
  test('Log-in should work correctly', async () => {
    const title = await page.title();
    expect(title).toBe('Getting Started 2');

    // wait for log in link in the page header to show up
    await page.waitForSelector('.page-header-container .nav-link[href="/login"]');

    await Promise.all([
      page.waitForNavigation(),
      page.click('.page-header-container .nav-link[href="/login"]'),
    ]);

    // wait for the google sign in button to show up
    const googleSignInButtonSelector = '.sign-in-page .google-sign-in-button';
    await page.waitForSelector('.sign-in-page .google-sign-in-button');
  }, timeout);
});
