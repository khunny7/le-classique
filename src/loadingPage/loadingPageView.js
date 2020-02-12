import './loadingPageStyle.less';

class LoadingPageView {
  render() {
    this.container = document.createElement('div');
    this.container.className = 'loading-page-container';

    let loadingTextDiv = document.createElement('div');
    loadingTextDiv.className = 'loading-element'
    loadingTextDiv.innerText = 'Loading Text';
    this.container.appendChild(loadingTextDiv);

    window.document.body.appendChild(this.container);
  }

  remove() {
    window.document.body.removeChild(this.container);
  }
}

export { LoadingPageView };
