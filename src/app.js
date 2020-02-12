import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { Redirect } from 'react-router';
import { SignInPage } from './sign-in-page/signInPage';
import { DashboardPage } from './dashboard/dashboard-page';
import JakeTheDog from '../assets/jake.png'
import firebase from 'firebase/app';

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
    }
  }

  render() {
    const showJakeComponent = () => {
      if (this.state.isJakeVisible) {
        return (
          <img src={JakeTheDog} onClick={this.hideJake}></img>
        )
      } else {
        return (
          <button onClick={this.showJake}>Show Jake</button>
        )
      }
    }

    return (
      <Router>
        {
          this.state.currentUser === null &&
          <Redirect push to="/login" />
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
        </Switch>
      </Router>
    )
  }
}

export default App
