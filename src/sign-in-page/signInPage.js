import React from 'react';
import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';

// TODO: use withRouter
class SignInPage extends React.Component {
  componentDidMount() {
    if (firebase.auth().currentUser !== null) {
      return;
    }

    this.ui = new firebaseui.auth.AuthUI(firebase.auth());

    const uiConfig = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        uiShown: () => { },
        signInSuccessWithAuthResult: (/* authResult, redirectUrl */) => true,
      },
      signInFlow: 'popup',
      signInSuccessUrl: '/',
    };

    this.ui.start('#firebaseui-auth-container', uiConfig);
  }

  componentWillUnmount() {
    if (this.ui) {
      this.ui.delete();
    }
  }

  render() {
    return (
      <div id="firebaseui-auth-container" />
    );
  }
}

export default SignInPage;
