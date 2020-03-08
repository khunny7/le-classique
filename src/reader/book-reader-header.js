import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PageHeader from '../components/page-header';
import BookReaderSettingsModal from './book-reader-settings-modal';

const ReaderReaderHeader = (props) => {
  const { book } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="reader-header-container">
      <PageHeader
        mode="book-reader"
        onReaderSetting={() => setIsModalOpen(true)}
      />
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
