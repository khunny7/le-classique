import React, { useState } from 'react';
import firebase from 'firebase/app';
import {
  Button, Form, Container, Row, Col,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './custom-sign-in-page.less';

const SignInPage = () => {
  const history = useHistory();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');


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

  // const signUpWithEmailAndPassword = () => {
  //   firebase
  //     .auth()
  //     .createUserWithEmailAndPassword(emailAddress, password)
  //     .then(() => {
  //       history.push('/');
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

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
    <div className="log-in-page">
      <div className="log-in-header">
        <div className="head">
          <a href="/">Placeholder - Logo</a>
        </div>
      </div>
      <Container fluid>
        <div className="log-in-content">
          <Row>
            <Col xs={12}>
              <Button className="log-in-with-button google" onClick={() => signInWithGoogle()}>
                Continue with Google
              </Button>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Button className="log-in-with-button facebook" onClick={() => signInWithGoogle()}>
                Continue with facebook
              </Button>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className="divider">
                <strong className="divider-title">or</strong>
              </div>
            </Col>
          </Row>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Control placeholder="Email address" type="email" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Control placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Row>
              <Col xs={12} sm={6}>
                <div className="checkbox">
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Remember me" />
                  </Form.Group>
                </div>
              </Col>
              <Col xs={12} sm={6}>
                <Button
                  className="log-in-button"
                  onClick={() => signInWithEmailAndPassword()}
                >
                  Log in
                </Button>
              </Col>
            </Row>
          </Form>
          <Row>
            <Col>
              <a href="/">Forgot your password?</a>
            </Col>
          </Row>
          <div id="sign-up-section">
            <Row>
              <Col xs={12}>
                <div className="divider" />
              </Col>
            </Row>
            <Row>
              <Col>
                <h4>Don&apos;t have an account?</h4>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Button className="log-in-with-button signup" onClick={() => signInWithGoogle()}>
                  Sign up for Le-Classique
                </Button>
              </Col>
            </Row>
          </div>
          <Row>
            <Col xs={12}>
              <div className="divider" />
              <p className="textMuted">Message about terms &amp; conditions and Privacy policy</p>
            </Col>
          </Row>
        </div>
        {/* .login-content */}
      </Container>
      {/* .container */}
    </div>
  );
};

export default SignInPage;
