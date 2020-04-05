import 'core-js/stable';
import 'regenerator-runtime/runtime';

const timeout = process.env.SLOWMO ? 30000 : 10000;

beforeAll(async () => {
  await page.setViewport({
    width: 1440,
    height: 800,
    deviceScaleFactor: 1,
  });
  await page.goto('http://localhost:8080', { waitUntil: 'domcontentloaded' });
});

describe('Test header and title of the page', () => {
  test('Title of the page', async () => {
    const title = await page.title();
    expect(title).toBe('Getting Started 2');

    await page.waitForSelector('.jumbotron .welcome-user');

  }, timeout);
});
