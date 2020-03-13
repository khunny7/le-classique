import React, { useState, useContext, useEffect } from 'react';
import {
  Jumbotron, Container, Row, Col,
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
  const { textLoader } = localeContext;

  useEffect(() => {
    BookRepository.get().then((result) => {
      setBooks(result);
    });
  }, []);

  return (
    <div className="dashboard-container">
      <PageHeader />
      <Jumbotron>
        <h1>
          {textLoader('Hello_Users_Label')}
        </h1>
        <p>
          {textLoader('App_Description_Label')}
        </p>
      </Jumbotron>
      <Container>
        <UserBookList />
      </Container>
      <Container>
        <Row>
          <Col md={12}>
            {textLoader('Books_All_Library')}
          </Col>
        </Row>
        <BookListView books={books} />
      </Container>
    </div>
  );
};

export default DashboardPage;
