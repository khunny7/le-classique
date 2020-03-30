import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import SignInPage from './sign-in-page/custom-sign-in-page';
import DashboardPage from './dashboard/dashboard-page';
import BookReaderPage from './reader/book-reader-page';
import BooksManagerPage from './books-manager/books-manager';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContextProvider } from './context/user-context';
import { LocaleContextProvider } from './context/locale-context';

const App = () => (
  <UserContextProvider>
    <LocaleContextProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <DashboardPage />
          </Route>
          <Route path="/users">
            <div>
              Users
            </div>
          </Route>
          <Route path="/login">
            <SignInPage />
          </Route>
          <Route path="/book">
            <BookReaderPage />
          </Route>
          <Route path="/books-manager">
            <BooksManagerPage />
          </Route>
        </Switch>
      </Router>
    </LocaleContextProvider>
  </UserContextProvider>
);

export default App;
