import './loadingPageStyle.less';

class LoadingPageView {
  render() {
    this.container = document.createElement('div');
    this.container.className = 'loading-page-container';
    this.container.innerText = 'Loading Text';

    window.document.body.appendChild(this.container);
  }

  remove() {
    window.document.body.removeChild(this.container);
  }
}

export { LoadingPageView };
