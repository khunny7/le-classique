import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import { BookListView } from './book-list-view';
import { BookRepository } from '../data/book-repository';

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);

    this.bookRepository = new BookRepository();
    this.state = {
      books: [],
    };
  }

  componentDidMount() {
    this.bookRepository.get().then((books) => {
      this.setState({
        books,
      });
    });
  }

  render() {
    return (
      <div className="dashboard-container">
        <Jumbotron>
          <h1>Hello, users!</h1>
          <p>
            Le-classique is a serivce developed to provide a reading expereince across different langauges
          </p>
          <Button variant="primary">Learn more</Button>
        </Jumbotron>
        <BookListView books={this.state.books} />
      </div>
    )
  }
}

export { DashboardPage }
