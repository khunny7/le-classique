import React from 'react';
import PropTypes from 'prop-types';
import {
  Navbar,
  Nav,
  Button,
  NavDropdown,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/user-context';
import { useLocaleContext } from '../context/locale-context';
import './page-header.less';

const PageHeader = (props) => {
  const {
    mode, onReaderSetting,
  } = props;
  const { currentUser, signOut } = useUserContext();
  const { textLoader, setCurrentLocale, currentLocale } = useLocaleContext();

  const onSignOut = () => {
    signOut();
  };

  return (
    <div className="page-header-container">
      <Navbar className="nav-bar" collapseOnSelect expand="md" bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href="/">Le-classique</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/" className="to-home-link nav-link" lang={currentLocale}>
              {textLoader('Home_Label')}
            </Link>
            <Link to="/books-manager" className="books-manager-link nav-link" lang={currentLocale}>
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
              className="change-locale-button"
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
                <NavDropdown
                  className="current-user-dropdown"
                  title={currentUser.displayName ? currentUser.displayName : ''}
                  id="collasible-nav-dropdown"
                >
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
};

PageHeader.propTypes = {
  mode: PropTypes.string,
  onReaderSetting: PropTypes.func,
};

PageHeader.defaultProps = {
  mode: 'default',
  onReaderSetting: () => { },
};

export default PageHeader;
