import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import BookListView from './book-list-view';
import BookRepository from '../data/book-repository';

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
    };

    this.mountedState = false;
  }

  componentDidMount() {
    this.mountedState = true;

    BookRepository.get().then((books) => {
      // TODO: instead, canceling the data fetch is ideal
      if (!this.mountedState) {
        return;
      }
      this.setState({
        books,
      });
    });
  }

  componentWillUnmount() {
    this.mountedState = false;
  }

  render() {
    const { books } = this.state;
    return (
      <div className="dashboard-container">
        <Jumbotron>
          <h1>Hello, users!</h1>
          <p>
            Le-classique is a serivce developed to provide a reading expereince across different langauges
          </p>
          <Button variant="primary">Learn more</Button>
        </Jumbotron>
        <BookListView books={books} />
      </div>
    );
  }
}

export default DashboardPage;
