import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class BookListItemView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const linkTo = `/book/${this.props.book.id}`;
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={this.props.book.cover} />
        <Card.Body>
          <Card.Title>
            {this.props.book.title}
          </Card.Title>
          <Card.Text>
            {this.props.book.author}
          </Card.Text>
          <Card.Text>
            {this.props.book.description}
          </Card.Text>
          <Link to={linkTo}>READ</Link>
        </Card.Body>
      </Card>
    );
  }
}

export { BookListItemView };
