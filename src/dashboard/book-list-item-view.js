import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Book } from '../model/book';

const BookListItemView = (props) => {
  const { book } = props;
  const linkTo = `/book/${book.id}`;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={book.cover} />
      <Card.Body>
        <Card.Title>
          {book.title}
        </Card.Title>
        <Card.Text>
          {book.author}
        </Card.Text>
        <Card.Text>
          {book.description}
        </Card.Text>
        <Link to={linkTo}>READ</Link>
      </Card.Body>
    </Card>
  );
};

BookListItemView.propTypes = {
  book: PropTypes.instanceOf(Book).isRequired,
};

export default BookListItemView;
