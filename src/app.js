import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { Redirect } from 'react-router';
import { SignInPage } from './sign-in-page/signInPage';
import JakeTheDog from '../assets/jake.png'
import firebase from 'firebase/app';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isJakeVisible: false
    }

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
      isJakeVisible: false,
      currentUser: auth.currentUser,
    }

    this.showJake = this.showJake.bind(this)
    this.hideJake = this.hideJake.bind(this)
  }

  showJake() {
    this.setState({
      isJakeVisible: true
    })
  }

  hideJake() {
    this.setState({
      isJakeVisible: false
    })
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
          <Route path="/about">
            <div>
              About
            </div>
          </Route>
          <Route path="/users">
            <div>
              Users
            </div>
          </Route>
          <Route path="/login">
            <SignInPage />
          </Route>
          <Route path="/">
            <div>
              <h1 className="tomato-color">
                {this.props.title}
              </h1>
              {showJakeComponent()}
            </div>
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App
