import React from 'react';
import PropTypes from 'prop-types';
import { Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Book } from '../model/book';

const BookListItemView = (props) => {
  const { book } = props;
  const linkTo = `/book/${book.id}`;

  return (
    <Col
      className="book-list-item-container"
      xs={4}
      md={3}
      lg={2}
    >
      <Link to={linkTo}>
        <div className="book-list-item-content">
          <Image src={book.cover} fluid />
          <p className="book-title">{book.title}</p>
          <p className="book-author">{book.author}</p>
        </div>
      </Link>
    </Col>
  );
};

BookListItemView.propTypes = {
  book: PropTypes.instanceOf(Book).isRequired,
};

export default BookListItemView;
