import React from 'react';
import PropTypes from 'prop-types';
import { Book } from '../model/book';
import BookListItemView from './book-list-item-view';

const BookListView = (props/* , context */) => {
  const { books } = props;


  const renderBookList = () => books.map((bookDataItem) => (
    <BookListItemView
      key={bookDataItem.id}
      book={bookDataItem}
    />
  ));

  return (
    <div className="book-list-view">
      {
        books.length > 0
        && renderBookList()
      }
    </div>
  );
};

BookListView.propTypes = {
  books: PropTypes.arrayOf(PropTypes.instanceOf(Book)),
};

BookListView.defaultProps = {
  books: [],
};

export default BookListView;
