import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';
import { Redirect } from 'react-router';
import firebase from 'firebase/app';
import SignInPage from './sign-in-page/signInPage';
import { DashboardPage } from './dashboard/dashboard-page';
import BookReaderPage from './reader/book-reader-page';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    const auth = firebase.auth();

    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          currentUser: user,
        });
      } else {
        this.setState({
          currentUser: null,
        });
      }
    });

    this.state = {
      currentUser: auth.currentUser,
    };
  }

  render() {
    return (
      <Router>
        {
          this.state.currentUser === null
          && <Redirect push to="/login" />
        }
        <Switch>
          <Route path="/dashboard">
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
    );
  }
}

export default App;
