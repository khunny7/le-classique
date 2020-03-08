import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from 'react-bootstrap';
import BookRepository from '../data/book-repository';
import stringToKey from '../utils/stringToKey';

const TranslationEdit = (props) => {
  const {
    originalText,
    originalTranslation,
    onEditDone,
    bookId,
    translationId,
  } = props;
  const [translationEditText, setTranslationEditText] = useState(originalTranslation);

  const saveEdit = () => {
    const textId = stringToKey(originalText);

    if (translationId.length > 0) {
      BookRepository.updateBookTranslation(
        bookId,
        textId,
        translationId,
        translationEditText,
      )
        .then(() => {
          onEditDone(true, translationEditText);
        });
    } else {
      BookRepository.setBookTranslation(
        bookId,
        textId,
        translationEditText,
      )
        .then(() => {
          onEditDone(true, translationEditText);
        });
    }

  };

  const cancelEdit = () => {
    onEditDone(false);
  };

  return (
    <div className="translation-controller-content">
      <p>
        {originalText}
      </p>
      <textarea
        className="translation-text-edit-area"
        name="textarea"
        value={translationEditText}
        onChange={(event) => setTranslationEditText(event.target.value)}
      />
      <ButtonGroup className="translation-edit-button-group">
        <Button onClick={saveEdit}>Save</Button>
        <Button onClick={cancelEdit}>Cancel</Button>
      </ButtonGroup>
    </div>
  );
};

TranslationEdit.propTypes = {
  bookId: PropTypes.string.isRequired,
  originalText: PropTypes.string.isRequired,
  originalTranslation: PropTypes.string,
  onEditDone: PropTypes.func.isRequired,
  translationId: PropTypes.string,
};

TranslationEdit.defaultProps = {
  originalTranslation: '',
  translationId: '',
};

export default TranslationEdit;
