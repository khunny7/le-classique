import React, { useState } from 'react';
import firebase from 'firebase/app';
import {
  Button, Form, ToggleButtonGroup, ToggleButton,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './custom-sign-in-page.less';

const SignInPage = () => {
  const history = useHistory();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [signOption, setSignOption] = useState(1);

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth.languageCode = 'en';
    firebase.auth().signInWithPopup(provider).then((/* result */) => {


      history.push('/');
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;

      // eslint-disable-next-line
      console.warn(`error: ${errorCode}, msg: ${errorMessage}`);
    });
  };

  const signUpWithEmailAndPassword = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(emailAddress, password)
      .then(() => {
        history.push('/');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const signInWithEmailAndPassword = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailAddress, password)
      .then(() => {
        history.push('/');
      })
      .catch((error) => {
        // Handle Errors here.
        console.error(error);
      });
  };

  return (
    <div className="sign-in-page">
      <div className="sign-in-section">
        <div className="sign-in-main-contents">
          <ToggleButtonGroup
            type="radio"
            name="sign-in-or-up"
            value={signOption}
            onChange={(val) => { console.log(val); setSignOption(val); }}
          >
            <ToggleButton value={1}>Sign-In</ToggleButton>
            <ToggleButton value={2}>Sign-Up</ToggleButton>
          </ToggleButtonGroup>
          <div className="sign-in-up-section">
            {
              signOption === 1 &&
              (
                <div className="sign-in-container">
                  <Form>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button
                      className="sign-in-or-up-button"
                      onClick={() => signInWithEmailAndPassword()}>
                      Sign-In
                    </Button>
                  </Form>
                </div>
              )
            }
            {
              signOption === 2 &&
              (
                <div className="sign-up-container">
                  <Form>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
                      <Form.Text className="text-muted">
                        We will never share your email with anyone else.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button
                      className="sign-in-or-up-button"
                      onClick={() => signUpWithEmailAndPassword()}>
                      Sign-Up
                    </Button>
                  </Form>
                </div>
              )
            }
          </div>
          <div className="sign-in-with-button-container">
            <Button className="sign-in-with-button" onClick={() => signInWithGoogle()}>
              Sign in with Google Account
            </Button>
            <Button className="sign-in-with-button" onClick={() => signInWithGoogle()}>
              Sign in with facebook Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
