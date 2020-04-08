import React from 'react';
import firebase from 'firebase/app';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const SignInPage = () => {
  const history = useHistory();

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth.languageCode = 'en';
    firebase.auth().signInWithPopup(provider).then((/* result */) => {
      // The signed-in user info.
      // const { user } = result;

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
    <div className="sign-in-page">
      <Button className="google-sign-in-button" onClick={() => signInWithGoogle()}>
        Sign in with Google Account
      </Button>
    </div>
  );
};

export default SignInPage;
