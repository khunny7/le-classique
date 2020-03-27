import React, { useState, useEffect } from 'react';
// import firebase from 'firebase/app';
import BookListView from '../dashboard/book-list-view';
import BookRepository from '../data/book-repository';
import PageHeader from '../components/page-header';
import BookEditor from './book-editor';

const BooksManager = (props) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    BookRepository.get().then((result) => {
      setBooks(result);
    });
  }, []);

  const onBookSelected = (bookId) => {

  };

  return (
    <div className="books-manager-container">
      <PageHeader />
      <BookListView
        books={books}
        onBookSelected={onBookSelected}
      />
      <BookEditor />
    </div>
  );
};

export default BooksManager;
