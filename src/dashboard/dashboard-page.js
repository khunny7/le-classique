import React from 'react';
import { BookListView } from './book-list-view';

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="dashboard-container">
        Dashboard
        <BookListView />
      </div>
    )
  }
}

export { DashboardPage }
