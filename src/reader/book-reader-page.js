import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ePub from 'epubjs';
import './book-reader-style.less';
import BookRepository from '../data/book-repository';
import ReaderController from './reader-controller';
import ReaderTitleBar from './reader-title-bar';

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
      BookRepository.getBookContent(book.bookData).then((bookDataUrl) => {
        this.epubBook = ePub(bookDataUrl, {
          openAs: 'epub',
        });

        this.rendition = this.epubBook.renderTo('book-render-area', {
          width: '100%',
          height: '100%',
          method: 'continuous',
        });

        this.rendition.display();

        this.setState({
          book,
        });
      });
    });
  }

  render() {
    const { book } = this.state;
    return (
      <div className="book-reader-page">
        <div className="main-view-area">
          {
            book !== null
            && (
              <ReaderTitleBar
                book={this.epubBook}
              />
            )
          }

          {
            book !== null
            && (
              <ReaderController
                rendition={this.rendition}
              />
            )
          }
        </div>
        <div id="book-render-area" />
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
