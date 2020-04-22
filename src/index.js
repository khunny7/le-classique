import('./app-loader').then(({ default: appLoader }) => {
  appLoader.load();

  const loadingScreen = document.querySelector('.loading-screen');
  loadingScreen.remove();
}).catch((e) => {
  throw (e);
});
