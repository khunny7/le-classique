import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from 'react-bootstrap';
import _ from 'lodash/lang';
import BookRepository from '../data/book-repository';
import './translation-controller-style.less';
import stringToKey from '../utils/stringToKey';
import TranslationEdit from './translation-edit';
import AutoTranslation from './auto-translation';

const defaultState = {
  currentElement: null,
  translatedText: '',
  editMode: false,
  translationId: '',
};

class TranslationController extends React.Component {
  constructor(props) {
    super(props);
    const { rendition } = props;

    this.state = _.cloneDeep(defaultState);

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

        const textId = stringToKey(element.innerText);

        BookRepository.getBookTranslation(bookId, textId).then((data) => {
          if (data.exists) {
            this.setState({
              translatedText: data.text,
              translationId: data.id,
            });
          } else {
            this.setState({
              translatedText: 'no translation found',
              translationId: '',
            });
          }
        });
      }
    });

    rendition.on('locationChanged', (/* locationChangedEvent */) => {
      this.reset();
    });

    this.onEditDone = this.onEditDone.bind(this);
  }

  onEditDone(isSaved, text) {
    this.setState({
      editMode: false,
    });

    if (isSaved) {
      this.setState({
        translatedText: text,
      });
    }
  }

  reset() {
    const { currentElement } = this.state;

    if (currentElement !== null) {
      currentElement.style.backgroundColor = 'unset';
    }

    this.setState(defaultState);
  }

  edit() {
    this.setState({
      editMode: true,
    });
  }

  render() {
    const {
      currentElement,
      translatedText,
      translationId,
      editMode,
    } = this.state;

    const {
      bookId,
    } = this.props;

    if (currentElement == null) {
      return (<div />);
    }

    const classNames = ['translation-controller-container'];

    if (currentElement.offsetTop > document.body.offsetHeight / 2) {
      classNames.push('top-place');
    } else {
      classNames.push('bottom-place');
    }

    if (editMode) {
      classNames.push('edit-mode');
    }

    const readModeContent = () => (
      <div className="translation-controller-content">
        <p>
          {currentElement.innerText}
        </p>
        <div>
          <p>
            {translatedText}
          </p>
          {
            translatedText === 'no translation found'
            && <AutoTranslation originalText={currentElement.innerText} />
          }
        </div>
        <ButtonGroup className="translation-button-group">
          <Button onClick={() => this.edit()}>&#9998;</Button>
          <Button onClick={() => this.reset()}>&#10006;</Button>
        </ButtonGroup>
      </div>
    );

    return (
      <div className={classNames.join(' ')}>
        {
          !editMode
          && readModeContent()
        }
        {
          editMode
          && (
            <TranslationEdit
              originalText={currentElement.innerText}
              originalTranslation={translatedText}
              translationId={translationId}
              onEditDone={this.onEditDone}
              bookId={bookId}
            />
          )
        }
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
