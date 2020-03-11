import React from 'react';
import { Jumbotron, Button, Container, Row, Col } from 'react-bootstrap';
import BookListView from './book-list-view';
import BookRepository from '../data/book-repository';
import UserRepository from '../data/user-repository';
import PageHeader from '../components/page-header';
import { withUserContext } from '../context/user-context';
import { withLocaleContext } from '../context/locale-context';
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
    const { currentUser } = this.props.userContext;

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
    const { textLoader, setCurrentLocale } = this.props.localeContext;
    return (
      <div className="dashboard-container">
        <PageHeader />
        <Jumbotron>
          <h1>Hello, users!</h1>
          <p>
            Le-classique is a serivce developed to provide a reading expereince across different langauges
          </p>
          <Button variant="primary" onClick={() => setCurrentLocale('ko')}>한국어로</Button>
        </Jumbotron>
        <Container>
          <Row>
            <Col md={12}>
              {textLoader('Books_You_Read')}
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

export default withUserContext(withLocaleContext(DashboardPage));
