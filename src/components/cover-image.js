import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BookRepository from '../data/book-repository';
import './cover-image.less';

const CoverImage = (props) => {
  const { coverPath } = props;
  const [coverUrl, setCoverUrl] = useState(null);

  useEffect(() => {
    BookRepository.GetBookCoverFile(coverPath).then((url) => {
      setCoverUrl(url);
    });
  }, [coverPath]);

  return (
    <img src={coverUrl} className="book-cover" />
  );
};

CoverImage.propTypes = {
  coverPath: PropTypes.string.isRequired,
};

export default CoverImage;
