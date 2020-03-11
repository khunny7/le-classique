import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ePub from 'epubjs';
import './book-reader-style.less';
import BookRepository from '../data/book-repository';
import UserRepository from '../data/user-repository';
import ReaderController from './reader-controller';
import ReaderTitleBar from './reader-title-bar';
import BookReaderHeader from './book-reader-header';
import TranslationController from './translation-controller';
import { UserContext } from '../context/user-context';

class BookReaderPageComponent extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      book: null,
      bookId: null,
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
          ignoreClass: 'annotator-hl',
        });

        UserRepository.getUserBookData(
          this.context.currentUser.uid,
          bookId,
        ).then((bookData) => {
          if (bookData && bookData.location) {
            this.rendition.display(bookData.location);
          } else {
            this.rendition.display();
          }
        });

        // Automatically save the location
        this.rendition.on('locationChanged', (/* locationChangedEvent */) => {
          const locationStart = this.rendition.location.start.cfi;

          UserRepository.setUserBookData(
            this.context.currentUser.uid,
            bookId,
            {
              location: locationStart,
            }
          )
          this.context.currentUser;
        });

        this.setState({
          book,
          bookId,
        });
      });
    });
  }

  componentWillUnmount() {
    if (this.rendition) {
      this.rendition.destroy();
    }

    if (this.epubBook) {
      this.epubBook.destroy();
    }
  }

  render() {
    const { book, bookId } = this.state;
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
          {
            book !== null
            && (
              <TranslationController
                rendition={this.rendition}
                bookId={bookId}
              />
            )
          }
          <BookReaderHeader
            book={this.epubBook}
          />
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

BookReaderPageComponent.contextType = UserContext;

const BookReaderPage = withRouter(BookReaderPageComponent);
export default BookReaderPage;
