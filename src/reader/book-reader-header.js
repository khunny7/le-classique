import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import BookReaderSettingsModal from './book-reader-settings-modal';

const ReaderReaderHeader = (props) => {
  const { book } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="reader-header-container">
      <span>Le-Classique</span>
      <Button variant="outline-secondary">&#9750;</Button>
      <Button
        variant="outline-secondary"
        onClick={() => setIsModalOpen(true)}
      >
        &#9998;
      </Button>
      <BookReaderSettingsModal
        book={book}
        show={isModalOpen}
        onHide={() => setIsModalOpen(false)}
      />
    </div>
  );
};

ReaderReaderHeader.propTypes = {
  book: PropTypes.shape({
    setStyle: PropTypes.func,
  }),
};

ReaderReaderHeader.defaultProps = {
  book: null,
};

export default ReaderReaderHeader;
