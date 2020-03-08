import React from 'react';
import PropTypes from 'prop-types';
import {
  Navbar,
  Nav,
  Button,
  NavDropdown,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../user-context';

class PageHader extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  render() {
    const { mode, onReaderSetting } = this.props;
    const { currentUser, signOut } = this.context;

    const onSignOut = () => {
      signOut();
    };

    return (
      <div className="page-header-container">
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
          <Navbar.Brand href="/">Le-classique</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/" className="nav-link">Home</Link>
              {
                mode === 'book-reader'
                && (
                  <Button
                    variant="outline-secondary"
                    onClick={() => onReaderSetting(true)}
                  >
                    Reader Setting
                  </Button>
                )
              }

            </Nav>
            <Nav>
              {
                currentUser && (
                  <img
                    alt="user profile"
                    src={currentUser.photoURL}
                    width={40}
                    height={40}
                  />
                )
              }
              {
                currentUser && (
                  <NavDropdown title={currentUser.displayName} id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    <NavDropdown.Item onClick={onSignOut}>
                      Sign out
                    </NavDropdown.Item>
                  </NavDropdown>
                )
              }
              {
                !currentUser && (
                  <Link to="/login" className="nav-link">
                    Log in
                  </Link>
                )
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

PageHader.contextType = UserContext;

PageHader.propTypes = {
  mode: PropTypes.string,
  onReaderSetting: PropTypes.func,
};

PageHader.defaultProps = {
  mode: 'default',
  onReaderSetting: () => { },
};

export default PageHader;
