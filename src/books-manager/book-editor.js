import React, { useState, useEffect } from 'react';
// import firebase from 'firebase/app';
import { Button, Container, InputGroup, Image, Form, Row, Col } from 'react-bootstrap';
import { FilePicker } from 'react-file-picker';
import BookRepository from '../data/book-repository';

const BookEditor = (props) => {
  const [bookPath, setBookPath] = useState('');
  const [bookCoverUrl, setBookCoverUrl] = useState('');
  // const [bookTitle, setBookTitle] = useState(null);
  // const [bookAuthor, setBookAuthor] = useState(null);

  const onBookFilePicked = (fileObj) => {
    BookRepository.UploadBookFile(fileObj).then((fileInfo) => {
      setBookPath(fileInfo.path);
    });
  };

  const onBookCoverFilePicked = (fileObj) => {
    BookRepository.UploadBookCoverFile(fileObj).then((fileInfo) => {
      BookRepository.GetBookCoverFile(fileInfo.path).then((url) => {
        setBookCoverUrl(url);
      });
    });
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
              />
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
              />
            </InputGroup>
          </Col>
          <Col sm="4">
            <Image src={bookCoverUrl} thumbnail />
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default BookEditor;
