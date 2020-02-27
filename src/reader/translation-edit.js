import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from 'react-bootstrap';
import BookRepository from '../data/book-repository';
import md5 from '../utils/md5';

const TranslationEdit = (props) => {
  const {
    originalText,
    originalTranslation,
    onEditDone,
    bookId,
  } = props;
  const [translationEditText, setTranslationEditText] = useState(originalTranslation);

  const saveEdit = () => {
    const textId = md5(originalText);

    BookRepository.setBookTranslation(
      bookId,
      textId,
      translationEditText,
    )
      .then(() => {
        onEditDone(true, translationEditText);
      });
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
};

TranslationEdit.defaultProps = {
  originalTranslation: '',
};

export default TranslationEdit;
