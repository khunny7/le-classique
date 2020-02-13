import React from 'react';
import { Card } from 'react-bootstrap';

class BookListItemView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Img />
        <Card.Body>
          <Card.Title>
            {this.props.title}
          </Card.Title>
          <Card.Text>
            {this.props.description}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export { BookListItemView }
