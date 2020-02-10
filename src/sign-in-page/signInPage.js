import React from 'react';
import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import { Redirect } from 'react-router';

class SignInPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (firebase.auth().currentUser !== null) {
      return;
    }

    var ui = new firebaseui.auth.AuthUI(firebase.auth());

    var uiConfig = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        uiShown: () => { },
        signInSuccessWithAuthResult: (authResult, redirectUrl) => {
          return true;
        },
      },
      signInFlow: 'popup',
      signInSuccessUrl: '/',
    }

    ui.start('#firebaseui-auth-container', uiConfig);
  }

  render() {
    if (firebase.auth().currentUser !== null) {
      return (<Redirect push to="/" />)
    }

    return (
      <div id="firebaseui-auth-container"></div>
    )
  }
}

export { SignInPage }