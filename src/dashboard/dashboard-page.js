import React, { useState, useContext, useEffect } from 'react';
import {
  Jumbotron, Container, Row, Col, Button
} from 'react-bootstrap';
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
              Browse Bookshelf &#11206;
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
        <BookListView books={books} />
      </Container>
    </div>
  );
};

export default DashboardPage;
