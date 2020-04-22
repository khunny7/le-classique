import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BookRepository from '../data/book-repository';
import { cancellable } from '../utils/cancellable';
import './cover-image.less';

const CoverImage = (props) => {
  const { coverPath } = props;
  const [coverUrl, setCoverUrl] = useState(null);

  useEffect(() => {
    console.log(`use effect called path: ${coverPath} url: ${coverUrl}`);
    const [wrapped, cancel] = cancellable(BookRepository.GetBookCoverFile(coverPath));
    wrapped.then((url) => {
      setCoverUrl(url);
    }).catch((e) => { console.log(e); });

    return cancel;
  }, [coverPath]);

  if (coverUrl === null) {
    return (
      <div className="book-cover-placeholder">
        <p className="book-cover-placeholder-text">
          Image Loading...
        </p>
      </div>
    );
  }

  return (
    <img
      src={coverUrl}
      className="book-cover"
      alt="read a book"
    />
  );
};

CoverImage.propTypes = {
  coverPath: PropTypes.string.isRequired,
};

export default CoverImage;
