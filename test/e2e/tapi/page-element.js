class PageElement {
  constructor(page, selector) {
    this.page = page;
    this.selector = selector;
  }

  async clickAsync() {
    await page.waitForSelector(this.selector);
    await page.hover(this.selector);
    await page.click(this.selector);
  }

  async getTextAsync() {
    await page.waitForSelector(this.selector);
    await page.hover(this.selector);
    const elm = await page.$(this.selector);
    const text = await page.evaluate((item) => item.innerText, elm);

    return text;
  }
}

export default PageElement;
