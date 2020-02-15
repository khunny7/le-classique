import LoadingPageView from './loadingPage/loadingPageView';

const loadingPageView = new LoadingPageView();

loadingPageView.render();

import('./app-loader').then(({ default: appLoader }) => {
  appLoader.load();

  loadingPageView.remove();
}).catch(() => 'An error occured while loading the component');
