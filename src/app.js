import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import JakeTheDog from '../assets/jake.png'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isJakeVisible: false
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
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
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
