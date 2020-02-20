import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import translateText from '../data/bing-translate';
import BookRepository from '../data/book-repository';
import './translation-controller-style.less';
import md5 from '../utils/md5';

class TranslationController extends React.Component {
  constructor(props) {
    super(props);
    const { rendition } = props;

    this.state = {
      currentElement: null,
      translatedText: '',
      autoTranslatedText: '',
    };

    rendition.on('click', (e) => {
      e.stopPropagation();
      e.stopImmediatePropagation();

      const { bookId } = this.props;

      const element = e.srcElement;

      this.reset();

      if (e.target.tagName.toUpperCase() === 'P') {
        element.style.backgroundColor = 'tomato';

        this.setState({
          currentElement: element,
        });

        const textId = md5(element.innerText);

        BookRepository.getBookTranslation(bookId, textId).then((data) => {
          if (data.exists) {
            this.setState({
              translatedText: data.text,
            });
          } else {
            this.setState({
              translatedText: 'no translation found',
            });
          }
        });

        translateText(element.innerText)
          .then((translated) => {
            this.setState({
              autoTranslatedText: translated,
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
      autoTranslatedText: '',
    });
  }

  render() {
    const { currentElement, translatedText, autoTranslatedText } = this.state;

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
          <p>
            {autoTranslatedText}
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
  bookId: PropTypes.string.isRequired,
};

export default TranslationController;
