import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import { withRouter, Link, Image } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';

const PageHader = (props) => {
  const { mode, onReaderSetting } = props;
  const auth = firebase.auth();
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  useEffect(
    () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setCurrentUser(user);
        } else {
          setCurrentUser(null);
        }
      });
    },
    [currentUser],
  );

  const onSignOut = () => {
    auth.signOut();
  }

  return (
    <div className="page-header-container">
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
        <Navbar.Brand href="/">Le-classique</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/" className="nav-link">Home</Link>
            {
              mode === "book-reader"
              &&
              <Button
                variant="outline-secondary"
                onClick={() => onReaderSetting(true)}
              >
                Reader Setting
            </Button>
            }

          </Nav>
          <Nav>
            {
              currentUser &&
              <img
                src={currentUser.photoURL}
                width={40}
                height={40}
              />
            }
            {
              currentUser &&
              <NavDropdown title={currentUser.displayName} id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                <NavDropdown.Item onClick={onSignOut}>
                  Sign out
                </NavDropdown.Item>
              </NavDropdown>
            }
            {
              !currentUser &&
              <Link to="/login" className="nav-link">Log In</Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div >
  );
};

PageHader.propTypes = {
  mode: PropTypes.string,
  onReaderSetting: PropTypes.func,
};

PageHader.defaultProps = {
  mode: 'default',
  onReaderSetting: () => { },
};

export default PageHader;
