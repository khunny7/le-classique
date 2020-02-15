import React from 'react';
import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import { Redirect } from 'react-router';

// TODO: use withRouter
class SignInPage extends React.Component {
  componentDidMount() {
    if (firebase.auth().currentUser !== null) {
      return;
    }

    const ui = new firebaseui.auth.AuthUI(firebase.auth());

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
      signInSuccessUrl: '/dashboard',
    };

    ui.start('#firebaseui-auth-container', uiConfig);
  }

  render() {
    if (firebase.auth().currentUser !== null) {
      return (<Redirect push to="/dashboard" />);
    }

    return (
      <div id="firebaseui-auth-container" />
    );
  }
}

export default SignInPage;
