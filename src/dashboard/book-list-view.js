import React from 'react';
import PropTypes from 'prop-types';
import { CardColumns } from 'react-bootstrap';
import { Book } from '../model/book';
import BookListItemView from './book-list-item-view';

const BookListView = (props/* , context */) => {
  const { books } = props;

  const renderBookList = () => {
    return (
      <CardColumns>
        {
          books.map((bookDataItem) => (
            <BookListItemView
              key={bookDataItem.id}
              book={bookDataItem}
            />
          ))
        }
      </CardColumns>
    );
  };

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
