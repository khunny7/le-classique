import React, { useState, useEffect } from 'react';
import {
  Jumbotron,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Scrollchor from 'react-scrollchor';
import BlockUi from 'react-block-ui';
import BookListView from './book-list-view';
import BookRepository from '../data/book-repository';
import PageHeader from '../components/page-header';
import { useLocaleContext } from '../context/locale-context';
import UserBookList from './user-book-list';
import './dashboard-style.less';
import { cancellable } from '../utils/cancellable';

const DashboardPage = () => {
  const [books, setBooks] = useState([]);
  const [isAllBooksLoading, setIsAllBooksLoading] = useState(true);
  const localeContext = useLocaleContext();
  const { textLoader, currentLocale } = localeContext;
  const history = useHistory();

  const onBookSelected = (bookId) => {
    history.push(`/book/${bookId}`);
  };

  useEffect(() => {
    const [wrapped, cancel] = cancellable(BookRepository.get());
    wrapped.then((result) => {
      setBooks(result);
      setIsAllBooksLoading(false);
    }).catch((e) => { console.log(e); });

    return cancel;
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
            <Scrollchor to="#pre-book-shelf" className="browsing-btn">
              {textLoader('Book_Bookshelf_Button_Label')}
              &nbsp;&#11206;
            </Scrollchor>
          </div>
        </div>
      </Jumbotron>
      <div id="pre-book-shelf" />
      <div className="book-shelf-container">
        <UserBookList />
        <h2 lang={currentLocale}>
          {textLoader('Books_All_Library')}
        </h2>
        <BlockUi tag="div" blocking={isAllBooksLoading}>
          <BookListView
            books={books}
            onBookSelected={onBookSelected}
          />
        </BlockUi>
      </div>
    </div>
  );
};

export default DashboardPage;
