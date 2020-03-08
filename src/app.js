import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import SignInPage from './sign-in-page/signInPage';
import DashboardPage from './dashboard/dashboard-page';
import BookReaderPage from './reader/book-reader-page';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContextProvider } from './user-context';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  render() {
    return (
      <UserContextProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <DashboardPage />
            </Route>
            <Route path="/users">
              <div>
                Users
              </div>
            </Route>
            <Route path="/login">
              <SignInPage />
            </Route>
            <Route path="/book">
              <BookReaderPage />
            </Route>
          </Switch>
        </Router>
      </UserContextProvider>
    );
  }
}

export default App;
