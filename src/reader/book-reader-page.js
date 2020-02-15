import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BookRepository } from '../data/book-repository';

class BookReaderPageComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      book: null,
    };
  }

  componentDidMount() {
    const patt = new RegExp('^/book/(.+)$');
    const { location } = this.props;
    const path = location.pathname;
    const bookId = patt.exec(path)[1];

    BookRepository.getBookById(bookId).then((book) => {
      this.setState({
        book,
      });
    });
  }

  render() {
    const { book } = this.state;
    return (
      <div className="book-reader-page">
        book reader page
        {book}
      </div>
    );
  }
}

BookReaderPageComponent.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

const BookReaderPage = withRouter(BookReaderPageComponent);
export default BookReaderPage;
