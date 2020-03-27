import React, { useState, useContext, useEffect } from 'react';
import {
  Jumbotron, Container, Row, Col, Button
} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import BookListView from './book-list-view';
import BookRepository from '../data/book-repository';
import PageHeader from '../components/page-header';
import { LocaleContext } from '../context/locale-context';
import UserBookList from './user-book-list';
import './dashboard-style.less';

const DashboardPage = (props) => {
  const [books, setBooks] = useState([]);
  const localeContext = useContext(LocaleContext);
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
            <Button className="browsing-btn">
              {textLoader('Book_Bookshelf_Button_Label')}
              &nbsp;&#11206;
            </Button>
          </div>
        </div>
      </Jumbotron>
      <Container>
        <UserBookList />
      </Container>
      <Container>
        <Row>
          <Col md={12} lang={currentLocale}>
            {textLoader('Books_All_Library')}
          </Col>
        </Row>
        <BookListView
          books={books}
          onBookSelected={onBookSelected}
        />
      </Container>
    </div>
  );
};

export default DashboardPage;
