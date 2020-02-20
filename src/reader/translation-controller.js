import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import translateText from '../data/bing-translate';
import './translation-controller-style.less';

class TranslationController extends React.Component {
  constructor(props) {
    super(props);
    const { rendition } = props;

    this.state = {
      currentElement: null,
      translatedText: '',
    };

    rendition.on('click', (e) => {
      e.stopPropagation();
      e.stopImmediatePropagation();

      const element = e.srcElement;

      this.reset();

      if (e.target.tagName.toUpperCase() === 'P') {
        element.style.backgroundColor = 'tomato';

        this.setState({
          currentElement: element,
          translatedText: '',
        });

        translateText(element.innerText)
          .then((translated) => {
            this.setState({
              translatedText: translated,
            });
          });
      }
    });
  }

  reset() {
    const { currentElement } = this.state;

    if (currentElement !== null) {
      currentElement.style.backgroundColor = 'unset';
    }

    this.setState({
      currentElement: null,
      translatedText: '',
    });
  }

  render() {
    const { currentElement, translatedText } = this.state;

    if (currentElement == null) {
      return (<div />);
    }

    const classNames = ['translation-controller-container'];

    if (currentElement.offsetTop > document.body.offsetHeight / 2) {
      classNames.push('top-place');
    } else {
      classNames.push('bottom-place');
    }

    return (
      <div className={classNames.join(' ')}>
        <div className="translation-controller-content">
          <p>
            {currentElement.innerText}
          </p>
          <p>
            {translatedText}
          </p>
          <Button onClick={() => this.reset()}>&#10006;</Button>
        </div>
      </div>
    );
  }
}

TranslationController.propTypes = {
  rendition: PropTypes.shape({
    on: PropTypes.func.isRequired,
  }).isRequired,
};

export default TranslationController;
