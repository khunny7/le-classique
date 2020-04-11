import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Book } from '../model/book';
import CoverImage from '../components/cover-image';
import './book-list-item-view.less';

const BookListItemView = (props) => {
  const { book, onBookSelected } = props;

  const BookListItemContent = () => (
    <div className="book-list-item-content">
      <CoverImage coverPath={book.cover} />
      <div className="book-detail">
        <p className="book-title">{book.title}</p>
        <p className="book-author">{book.author}</p>
      </div>
    </div>
  );

  return (
    <div
      className="book-list-item-container"
    >
      <Button
        style={{ width: '100%' }}
        className="book-list-item-btn"
        onClick={() => onBookSelected(book.id)}
      >
        <BookListItemContent />
      </Button>
    </div>
  );
};

BookListItemView.propTypes = {
  book: PropTypes.instanceOf(Book).isRequired,
  onBookSelected: PropTypes.func.isRequired,
};

export default BookListItemView;
