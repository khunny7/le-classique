import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Container, InputGroup, Form, Row, Col,
} from 'react-bootstrap';
import { FilePicker } from 'react-file-picker';
import CoverImage from '../components/cover-image';
import BookRepository from '../data/book-repository';
import { Book } from '../model/book';
import './book-editor.less';

const BookEditor = (props) => {
  const { book, onBookSaved } = props;
  const [bookId, setBookId] = useState(book ? book.id : null);
  const [bookPath, setBookPath] = useState(book ? book.bookData : '');
  const [bookCoverPath, setBookCoverPath] = useState(book ? book.cover : '');
  const [bookTitle, setBookTitle] = useState(book ? book.title : '');
  const [bookAuthor, setBookAuthor] = useState(book ? book.author : '');

  useEffect(() => {
    setBookId(book ? book.id : null);
    setBookPath(book ? book.bookData : '');
    setBookCoverPath(book ? book.cover : '');
    setBookTitle(book ? book.title : '');
    setBookAuthor(book ? book.author : '');
  }, [book]);

  const onBookFilePicked = (fileObj) => {
    BookRepository.UploadBookFile(fileObj).then((fileInfo) => {
      setBookPath(fileInfo.path);
    });
  };

  const onBookCoverFilePicked = (fileObj) => {
    BookRepository.UploadBookCoverFile(fileObj).then((fileInfo) => {
      setBookCoverPath(fileInfo.path);
    });
  };

  const onDeleteBook = () => {
    // eslint-disable-next-line
    if (confirm(`Are you sure, you want to delete book ${bookTitle} by ${bookAuthor}`)) {
      BookRepository.deleteBook(bookId).then(() => onBookSaved());
    }
  };

  const onSaveBook = () => {
    // validate
    if (bookPath.length === 0
      || bookCoverPath.length === 0
      || bookTitle.length === 0
      || bookAuthor.length === 0) {
      return;
    }

    const bookToSave = new Book(bookId, {
      author: bookAuthor,
      title: bookTitle,
      cover: bookCoverPath,
      bookData: bookPath,
    });

    BookRepository.saveBook(bookToSave).then(() => onBookSaved());
  };

  return (
    <Container className="book-edit-container">
      <Form>
        <Form.Group as={Row} controlId="form-file-path">
          <Form.Label column sm="2">
            EPUB File
          </Form.Label>
          <Col sm="10">
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <FilePicker
                  extensions={['epub']}
                  onChange={onBookFilePicked}
                  onError={(errMsg) => throw errMsg}
                >
                  <Button variant="outline-secondary">
                    Upload EPUB
                  </Button>
                </FilePicker>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                readOnly
                value={bookPath}
                isInvalid={bookPath.length === 0}
              />
              <Form.Control.Feedback type="invalid">
                EPUB file is required
              </Form.Control.Feedback>
            </InputGroup>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="form-book-cover">
          <Form.Label column sm="2">
            Book Cover
          </Form.Label>
          <Col sm="10">
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <FilePicker
                  extensions={['jpg', 'jpeg', 'png']}
                  onChange={onBookCoverFilePicked}
                  onError={(errMsg) => throw errMsg}
                >
                  <Button variant="outline-secondary">
                    Upload Book Cover
                  </Button>
                </FilePicker>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                readOnly
                value={bookCoverPath}
                isInvalid={bookCoverPath.length === 0}
              />
              <Form.Control.Feedback type="invalid">
                Book cover is required
              </Form.Control.Feedback>
            </InputGroup>
          </Col>
          {
            bookCoverPath.length > 0
            && (
              <Col sm="4">
                <CoverImage coverPath={bookCoverPath} />
              </Col>
            )
          }
        </Form.Group>
        <Form.Group controlId="formBookAuthor">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter author"
            onChange={(e) => setBookAuthor(e.target.value)}
            value={bookAuthor}
            isInvalid={bookAuthor.length === 0}
          />
          <Form.Text className="text-muted">
            Enter the author name in English as acurate as possible
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            Book author is required
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBookTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter book title"
            onChange={(e) => setBookTitle(e.target.value)}
            value={bookTitle}
            isInvalid={bookTitle.length === 0}
          />
          <Form.Text className="text-muted">
            Enter the title of the book in English as acurate as possible
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            Book title is required
          </Form.Control.Feedback>
        </Form.Group>
        <Button onClick={onSaveBook}>
          Save book
        </Button>
        <Button onClick={onDeleteBook}>
          Delete book
        </Button>
      </Form>
    </Container>
  );
};

BookEditor.propTypes = {
  book: PropTypes.instanceOf(Book),
  onBookSaved: PropTypes.func.isRequired,
};

BookEditor.defaultProps = {
  book: null,
};

export default BookEditor;
