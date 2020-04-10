import 'core-js/stable';
import 'regenerator-runtime/runtime';
import PageElement from './tapi/page-element';

const timeout = 60000;

const signInCredential = {
  id: 'piano8283test@gmail.com',
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
    const googleSignInButton = new PageElement(page, '.sign-in-page .google-sign-in-button');

    // verify that the popup window for the sign in shows up
    const [popup] = await Promise.all([
      new Promise(resolve => page.once('popup', resolve)),
      googleSignInButton.clickAsync(),
    ]);

    await popup.waitForSelector('input[type="email"]');
    await popup.type('input[type="email"]', signInCredential.id);

    await Promise.all([
      popup.waitForNavigation(),
      popup.click('div[role="button"]#identifierNext'),
    ]);

    await popup.waitForSelector('input[type="password"]');
    // wait for one second before typing
    await popup.waitFor(1000);
    await popup.type('input[type="password"]', signInCredential.password);

    await Promise.all([
      page.waitForNavigation(),
      popup.click('div[role="button"]#passwordNext'),
    ]);

    // Since the user is signed in, user dropdown should be shown
    const testUserDropdown = new PageElement(page, '.current-user-dropdown a.dropdown-toggle');
    const userName = await testUserDropdown.getTextAsync();
    expect(userName).toBe('Test User');
  }, timeout);
});
