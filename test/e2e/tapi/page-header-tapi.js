const pageHeaderContainer = '.page-header-container';
const navBar = `${pageHeaderContainer} .nav-bar.navbar`;
const navBarCollapse = `${navBar} .navbar-collapse`;
const localeButton = `${navBarCollapse} .change-locale-button`;
const manageBooksLink = `${navBarCollapse} .books-manager-link`;

import PageElement from './page-element';

class PageHeaderTapi {
  constructor(page) {
    this.page = page;
  }

  verifyLoadedAsync = async () => {
    await page.waitForSelector(navBar);
  }

  getLocaleButton = () => new PageElement(this.page, localeButton);

  getManageBooksLink = () => new PageElement(this.page, manageBooksLink);
}

export default PageHeaderTapi;
