import React from 'react';
import PropTypes from 'prop-types';
import { Book } from '../model/book';
import BookListItemView from './book-list-item-view';

const BookListView = (props/* , context */) => {
  const { books } = props;

  return (
    <div className="book-list-view">
      {
        books
        && books.map((bookDataItem) => (
          <BookListItemView
            key={bookDataItem.id}
            book={bookDataItem}
          />
        ))
      }
    </div>
  );
};

BookListView.propTypes = {
  books: PropTypes.arrayOf(PropTypes.objectOf(Book)),
};

BookListView.defaultProps = {
  books: [],
};

export default BookListView;
