import React from 'react';
import firebase from 'firebase/app';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

const SignInPage = (props) => {
  const { history } = props;

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth.languageCode = 'en';
    firebase.auth().signInWithPopup(provider).then((result) => {
      // The signed-in user info.
      const user = result.user;

      history.push('/');
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;

      console.error(errorCode);
      console.error(errorMessage);
    });
  };

  return (
    <Button onClick={() => signInWithGoogle()}>
      Sign in with Google Account
    </Button>
  );
};

export default withRouter(SignInPage);
