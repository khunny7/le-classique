import React, { useState, useEffect } from 'react';
// import firebase from 'firebase/app';
import { withRouter } from 'react-router-dom';
import BookListView from '../dashboard/book-list-view';
import BookRepository from '../data/book-repository';
import PageHeader from '../components/page-header';
import BookEditor from './book-editor';

const BooksManager = (props) => {
  const { history } = props;

  const [books, setBooks] = useState([]);

  useEffect(() => {
    BookRepository.get().then((result) => {
      setBooks(result);
    });
  }, []);

  return (
    <div className="books-manager-container">
      <PageHeader />
      <BookListView books={books} />
      <BookEditor />
    </div>
  );
};

export default withRouter(BooksManager);
