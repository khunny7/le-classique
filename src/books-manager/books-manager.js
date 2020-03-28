import React, { useState, useEffect } from 'react';
// import firebase from 'firebase/app';
import BookListView from '../dashboard/book-list-view';
import BookRepository from '../data/book-repository';
import PageHeader from '../components/page-header';
import BookEditor from './book-editor';

const BooksManager = (props) => {
  const [books, setBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);

  useEffect(() => {
    BookRepository.get().then((result) => {
      setBooks(result);
    });
  }, []);

  const refreshData = () => {
    BookRepository.get().then((result) => {
      setBooks(result);
      setCurrentBook(null);
    });
  };

  const onBookSelected = (bookId) => {
    BookRepository.getBookById(bookId).then((bookObj) => {
      setCurrentBook(bookObj);
    });
  };

  return (
    <div className="books-manager-container">
      <PageHeader />
      <BookListView
        books={books}
        onBookSelected={onBookSelected}
      />
      <BookEditor
        book={currentBook}
        onBookSaved={refreshData}
      />
    </div>
  );
};

export default BooksManager;
