import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';

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
      this.setState({ currentUser: user });
    });

    this.state = {
      currentUser: this.auth.currentUser,
    };
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

export { UserContext, UserContextProvider };
