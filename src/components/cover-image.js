import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import BookRepository from '../data/book-repository';

const CoverImage = (props) => {
  const { coverPath } = props;
  const [coverUrl, setCoverUrl] = useState(null);

  useEffect(() => {
    BookRepository.GetBookCoverFile(coverPath).then((url) => {
      setCoverUrl(url);
    });
  }, [coverPath]);

  return (
    <Image src={coverUrl} fluid />
  );
};

CoverImage.propTypes = {
  coverPath: PropTypes.string.isRequired,
};

export default CoverImage;
