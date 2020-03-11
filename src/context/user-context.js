import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import UserRepository from '../data/user-repository';

const UserContext = React.createContext({
  currentUser: {
    name: 'guest',
  },
});

class UserContextProvider extends React.Component {
  constructor(props) {
    super(props);

    this.auth = firebase.auth();

    this.auth.onAuthStateChanged((user) => {
      if (user) {
        UserRepository.getUserAndSet(user.uid, user).then((lcUser) => {
          this.setState({
            currentUser: lcUser.getData(),
          });
        });
      } else {
        this.setState({ currentUser: null });
      }
    });

    if (this.auth.currentUser) {
      UserRepository.getUserAndSet(this.auth.currentUser.uid, this.auth.currentUser).then((lcUser) => {
        this.setState({
          currentUser: lcUser.getData(),
        });
      });
    } else {
      this.state = {
        currentUser: null,
      };
    }
  }

  render() {
    const { children } = this.props;
    const { currentUser } = this.state;

    return (
      <UserContext.Provider value={{ currentUser, signOut: () => firebase.auth().signOut() }}>
        {children}
      </UserContext.Provider>
    );
  }
}

UserContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

const withUserContext = (Component) => (
  (props) => (
    <UserContext.Consumer>
      {(context) => <Component userContext={context} {...props} />}
    </UserContext.Consumer>
  )
);

export { UserContext, UserContextProvider, withUserContext };
