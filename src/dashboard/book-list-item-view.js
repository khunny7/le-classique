import React from 'react';
import PropTypes from 'prop-types';
import { Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Book } from '../model/book';
import CoverImage from '../components/cover-image';

const BookListItemView = (props) => {
  const { book, onBookSelected } = props;
  const linkTo = `/book/${book.id}`;

  const BookListItemContent = () => {
    return (
      <div className="book-list-item-content">
        <CoverImage coverPath={book.cover} />
        <p className="book-title">{book.title}</p>
        <p className="book-author">{book.author}</p>
      </div>
    );
  };

  return (
    <Col
      className="book-list-item-container"
      xs={4}
      md={3}
      lg={2}
    >
      <Button onClick={() => onBookSelected(book.id)}>
        <BookListItemContent />
      </Button>
    </Col>
  );
};

BookListItemView.propTypes = {
  book: PropTypes.instanceOf(Book).isRequired,
  onBookSelected: PropTypes.func.isRequired,
};

export default BookListItemView;
