import React, { useState, useEffect } from 'react';
import {
  Jumbotron,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Scrollchor from 'react-scrollchor';
import BookListView from './book-list-view';
import BookRepository from '../data/book-repository';
import PageHeader from '../components/page-header';
import { useLocaleContext } from '../context/locale-context';
import UserBookList from './user-book-list';
import './dashboard-style.less';

const DashboardPage = () => {
  const [books, setBooks] = useState([]);
  const localeContext = useLocaleContext();
  const { textLoader, currentLocale } = localeContext;
  const history = useHistory();

  const onBookSelected = (bookId) => {
    history.push(`/book/${bookId}`);
  };

  useEffect(() => {
    BookRepository.get().then((result) => {
      setBooks(result);
    });
  }, []);

  return (
    <div className="dashboard-container">
      <PageHeader />
      <Jumbotron className="jumbotron">
        <div className="welcome-user">
          <div className="welcome-user-text">
            <h1 className="user-name" lang={currentLocale}>
              {textLoader('Hello_Users_Label')}
            </h1>
            <p className="app-description" lang={currentLocale}>
              {textLoader('App_Description_Label')}
            </p>
            <Scrollchor to="#booklist" className="browsing-btn">
              {textLoader('Book_Bookshelf_Button_Label')}
              &nbsp;&#11206;
            </Scrollchor>
          </div>
        </div>
      </Jumbotron>
      <div className="book-shelf-container">
        <UserBookList />
        <h2 lang={currentLocale}>
          {textLoader('Books_All_Library')}
        </h2>
        <BookListView
          books={books}
          onBookSelected={onBookSelected}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
