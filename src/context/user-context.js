import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';
import BlockUi from 'react-block-ui';
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
    this.state = {
      currentUser: null,
      isLoadingUser: false,
    };

    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ isLoadingUser: true });
        UserRepository.getUserAndSet(user.uid, user).then((lcUser) => {
          this.setState({
            currentUser: lcUser.getData(),
          });
        }).finally(() => this.setState({ isLoadingUser: false }));
      } else {
        this.setState({ currentUser: null });
      }
    });

    if (this.auth.currentUser) {
      this.setState({ isLoadingUser: true });
      UserRepository.getUserAndSet(this.auth.currentUser.uid, this.auth.currentUser).then((lcUser) => {
        this.setState({
          currentUser: lcUser.getData(),
        });
      }).finally(() => this.setState({ isLoadingUser: false }));
    } else {
      this.state = {
        currentUser: null,
      };
    }
  }

  render() {
    const { children } = this.props;
    const { currentUser, isLoadingUser } = this.state;

    return (
      <UserContext.Provider value={{ currentUser, signOut: () => firebase.auth().signOut() }}>
        <BlockUi tag="div" blocking={isLoadingUser} style={{ width: '100%', height: '100%' }}>
          {children}
        </BlockUi>
      </UserContext.Provider>
    );
  }
}

const useUserContext = () => useContext(UserContext);

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

export {
  UserContext, UserContextProvider, withUserContext, useUserContext,
};
