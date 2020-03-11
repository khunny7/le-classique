import React from 'react';
import PropTypes from 'prop-types';
import {
  Jumbotron, Container, Row, Col,
} from 'react-bootstrap';
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
    const { userContext } = this.props;
    const { currentUser } = userContext;

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
    const { localeContext } = this.props;
    const { textLoader } = localeContext;
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
              {textLoader('Books_All_Library')}
            </Col>
          </Row>
          <BookListView books={books} />
        </Container>
      </div>
    );
  }
}

DashboardPage.propTypes = {
  localeContext: PropTypes.shape({
    textLoader: PropTypes.func.isRequired,
  }).isRequired,
  userContext: PropTypes.shape({
    currentUser: PropTypes.shape({
      uid: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default withUserContext(withLocaleContext(DashboardPage));
