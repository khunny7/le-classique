import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';
import { Book } from '../model/book';
import BookListItemView from './book-list-item-view';

const BookListView = (props/* , context */) => {
  const { books, onBookSelected } = props;

  const renderBookList = () => (
    <Row className="book-list-container">
      {
        books.map((bookDataItem) => (
          <BookListItemView
            key={bookDataItem.id}
            book={bookDataItem}
            onBookSelected={onBookSelected}
          />
        ))
      }
    </Row>
  );

  return (
    <>
      {
        books.length > 0
        && renderBookList()
      }
    </>
  );
};

BookListView.propTypes = {
  books: PropTypes.arrayOf(PropTypes.instanceOf(Book)),
  onBookSelected: PropTypes.func.isRequired,
};

BookListView.defaultProps = {
  books: [],
};

export default BookListView;
