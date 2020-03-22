import React, { useState, useEffect } from 'react';
// import firebase from 'firebase/app';
import { Button, Container, InputGroup, Image, Form, Row, Col } from 'react-bootstrap';
import { FilePicker } from 'react-file-picker';
import BookRepository from '../data/book-repository';
import { Book } from '../model/book';
import './book-editor.less';

const BookEditor = (props) => {
  const [bookPath, setBookPath] = useState('');
  const [bookCoverUrl, setBookCoverUrl] = useState('');
  const [bookCoverPath, setBookCoverPath] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');

  const onBookFilePicked = (fileObj) => {
    BookRepository.UploadBookFile(fileObj).then((fileInfo) => {
      setBookPath(fileInfo.path);
    });
  };

  const onBookCoverFilePicked = (fileObj) => {
    BookRepository.UploadBookCoverFile(fileObj).then((fileInfo) => {
      setBookCoverPath(fileInfo.path);
      BookRepository.GetBookCoverFile(fileInfo.path).then((url) => {
        setBookCoverUrl(url);
      });
    });
  };

  const onSaveBook = () => {
    // validate
    if (bookPath.length === 0
      || bookCoverPath.length === 0
      || bookTitle.length === 0
      || bookAuthor.length === 0) {
      return;
    }

    const bookToSave = new Book(null, {
      author: bookAuthor,
      title: bookTitle,
      cover: bookCoverPath,
      bookData: bookPath,
    });

    BookRepository.saveBook(bookToSave);
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
                  onError={(errMsg) => console.error(errMsg)}
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
                  onError={(errMsg) => console.error(errMsg)}
                >
                  <Button variant="outline-secondary">
                    Upload Book Cover
                  </Button>
                </FilePicker>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                readOnly
                value={bookCoverUrl}
                isInvalid={bookCoverUrl.length === 0}
              />
              <Form.Control.Feedback type="invalid">
                Book cover is required
              </Form.Control.Feedback>
            </InputGroup>
          </Col>
          <Col sm="4">
            <Image src={bookCoverUrl} thumbnail />
          </Col>
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
      </Form>
    </Container>
  );
};

export default BookEditor;
