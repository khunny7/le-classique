import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ReaderTitleBar = (props) => {
  const { book } = props;
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  if (!book) {
    return (<div />);
  }

  book.loaded.metadata.then((meta) => {
    document.title = `${meta.title} - ${meta.creator}`;

    setAuthor(meta.creator);
    setTitle(meta.title);
  });

  return (
    <div className="reader-title-bar">
      <div className="meta-info">
        <span className="book-title">
          {title}
        </span>
        <span className="title-seperator">
          -
        </span>
        <span className="author">
          {author}
        </span>
      </div>
    </div>
  );
};

ReaderTitleBar.propTypes = {
  book: PropTypes.shape({
    loaded: PropTypes.shape({
      metadata: PropTypes.shape({
        then: PropTypes.func,
      }),
    }),
  }),
};

ReaderTitleBar.defaultProps = {
  book: null,
};

export default ReaderTitleBar;
