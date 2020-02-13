import React from 'react';
import { BookListItemView } from './book-list-item-view';

class BookListView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="book-list-view">
        {
          this.props.books &&
          this.props.books.map((bookDataItem) => {
            return (
              <BookListItemView
                key={bookDataItem.id}
                title={bookDataItem.title}
                description={bookDataItem.description} />
            );
          })
        }
      </div>
    )
  }
}

export { BookListView }
