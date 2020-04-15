import React from 'react';
import PropTypes from 'prop-types';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { Book } from '../model/book';
import CoverImage from '../components/cover-image';
import './book-list-item-view.less';

const BookListItemView = (props) => {
  const { book, onBookSelected } = props;

  return (
    <div
      className="book-list-item-container"
    >
      <OverlayTrigger
        placement="top"
        overlay={(
          <Popover className="book-popover">
            <Popover.Title as="h3">{book.title}</Popover.Title>
            <Popover.Content>
              {book.author}
            </Popover.Content>
          </Popover>
        )}
      >
        <Button
          style={{ width: '100%' }}
          className="book-list-item-btn"
          onClick={() => onBookSelected(book.id)}
        >
          <div className="book-list-item-content">
            <div className="book-cover">
              <CoverImage coverPath={book.cover} />
            </div>
            <div className="book-detail">
              <p className="book-title">{book.title}</p>
              <p className="book-author">{book.author}</p>
            </div>
          </div>
        </Button>
      </OverlayTrigger>
    </div>
  );
};

BookListItemView.propTypes = {
  book: PropTypes.instanceOf(Book).isRequired,
  onBookSelected: PropTypes.func.isRequired,
};

export default BookListItemView;
