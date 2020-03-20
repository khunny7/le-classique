import React from 'react';
import PropTypes from 'prop-types';
import {
  Navbar,
  Nav,
  Button,
  NavDropdown,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withUserContext } from '../context/user-context';
import { withLocaleContext } from '../context/locale-context';

class PageHader extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  render() {
    const {
      mode, onReaderSetting, userContext, localeContext,
    } = this.props;
    const { currentUser, signOut } = userContext;
    const { textLoader, setCurrentLocale, currentLocale } = localeContext;

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
              <Link to="/" className="nav-link" lang={currentLocale}>
                {textLoader('Home_Label')}
              </Link>
              <Link to="/books-manager" className="nav-link" lang={currentLocale}>
                {textLoader('Book_Manage_Label')}
              </Link>
              {
                mode === 'book-reader'
                && (
                  <Button
                    lang={currentLocale}
                    variant="outline-secondary"
                    onClick={() => onReaderSetting(true)}
                  >
                    {textLoader('Reader_Setting_Button')}
                  </Button>
                )
              }
              <Button
                lang={currentLocale}
                variant="outline-secondary"
                onClick={() => setCurrentLocale(currentLocale === 'en' ? 'ko' : 'en')}
              >
                {
                  currentLocale === 'en'
                  && '한국어'
                }
                {
                  currentLocale === 'ko'
                  && 'English'
                }
              </Button>
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
                    <NavDropdown.Item onClick={onSignOut} lang={currentLocale}>
                      {textLoader('Log_Out_Label')}
                    </NavDropdown.Item>
                  </NavDropdown>
                )
              }
              {
                !currentUser && (
                  <Link to="/login" className="nav-link" lang={currentLocale}>
                    {textLoader('Log_In_Label')}
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

PageHader.propTypes = {
  mode: PropTypes.string,
  onReaderSetting: PropTypes.func,
  localeContext: PropTypes.shape({
    textLoader: PropTypes.func.isRequired,
    setCurrentLocale: PropTypes.func.isRequired,
    currentLocale: PropTypes.string.isRequired,
  }).isRequired,
  userContext: PropTypes.shape({
    currentUser: PropTypes.shape({
      uid: PropTypes.string.isRequired,
      photoURL: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
    }),
    signOut: PropTypes.func.isRequired,
  }).isRequired,
};

PageHader.defaultProps = {
  mode: 'default',
  onReaderSetting: () => { },
};

export default withLocaleContext(withUserContext(PageHader));
