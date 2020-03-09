import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from 'react-bootstrap';
import SentenceRepository from '../data/sentence-repository';
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
    const sentenceId = stringToKey(originalText);

    if (translationId.length > 0) {
      SentenceRepository.updateTranslation(
        sentenceId,
        translationId,
        translationEditText,
      )
        .then(() => {
          onEditDone(true, translationEditText);
        });
    } else {
      SentenceRepository.setSentenceTranslation(
        sentenceId,
        translationEditText,
        bookId,
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
