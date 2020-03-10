import React from 'react';
import { Jumbotron, Button, Container, Row, Col } from 'react-bootstrap';
import BookListView from './book-list-view';
import BookRepository from '../data/book-repository';
import UserRepository from '../data/user-repository';
import PageHeader from '../components/page-header';
import { UserContext } from '../user-context';
import './dashboard-style.less';

class DashboardPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      books: [],
      userBooks: [],
    };
  }

  componentDidMount() {
    this.fetchDataAndSetState();
  }

  componentDidUpdate() {
    this.fetchDataAndSetState();
  }

  fetchDataAndSetState() {
    const { currentUser } = this.context;

    if (!this.fetchBooks) {
      this.fetchBooks = BookRepository.get().then((books) => {
        this.setState({
          books,
        });
      });
    }

    if (!this.fetchUserBooks) {
      if (currentUser) {
        this.fetchUserBooks = UserRepository
          .getUserBookDataAll(currentUser.uid)
          .then((books) => {
            const bookIds = books.map((book) => book.id);

            BookRepository.getBooks(bookIds).then((userBooks) => {
              this.setState({
                userBooks,
              });
            });
          });
      }
    }
  }

  render() {
    const { books, userBooks } = this.state;
    return (
      <div className="dashboard-container">
        <PageHeader />
        <Jumbotron>
          <h1>Hello, users!</h1>
          <p>
            Le-classique is a serivce developed to provide a reading expereince across different langauges
          </p>
          <Button variant="primary">Learn more</Button>
        </Jumbotron>
        <Container>
          <Row>
            <Col md={12}>
              Books you have read
            </Col>
          </Row>
          <BookListView books={userBooks} />
        </Container>
        <Container>
          <Row>
            <Col md={12}>
              Browse the books
            </Col>
          </Row>
          <BookListView books={books} />
        </Container>
      </div>
    );
  }
}

DashboardPage.contextType = UserContext;

export default DashboardPage;
