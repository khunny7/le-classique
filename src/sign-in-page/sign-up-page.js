import React, { useState } from 'react';
import firebase from 'firebase/app';
import {
  Button, Form, Container, Row, Col, Alert
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './custom-sign-in-page.less';

const SignUpPage = () => {
  const history = useHistory();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const signUpWithEmailAndPassword = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(emailAddress, password)
      .then(() => {
        history.push('/');
      })
      .catch((error) => {
        setErrorMessage(error.message);
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
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Control placeholder="Email address" type="email" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Control placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            {
              errorMessage.length > 0 &&
              <Row>
                <Col sm={12}>
                  <Alert variant="warning">
                    {errorMessage}
                  </Alert>
                </Col>
              </Row>
            }
            <Row>
              <Col xs={12} sm={6}>
                <Button
                  className="sign-up-button"
                  onClick={() => signUpWithEmailAndPassword()}
                >
                  Sign Up
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
        {/* .login-content */}
      </Container>
      {/* .container */}
    </div>
  );
};

export default SignUpPage;
