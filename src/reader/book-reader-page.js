import React from 'react';
import  { withRouter } from 'react-router-dom';

class BookReaderPageComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="book-reader-page">
        book reader page
      </div>
    )
  }
}

const BookReaderPage = withRouter(BookReaderPageComponent);
export { BookReaderPage };
