import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/user-context';
import { LocaleContext } from '../context/locale-context';
import BookRepository from '../data/book-repository';
import UserRepository from '../data/user-repository';
import BookListView from './book-list-view';

const UserBookList = (props) => {
  const [userBooks, setUserBooks] = useState([]);
  const userContext = useContext(UserContext);
  const { currentUser } = userContext;
  const localeContext = useContext(LocaleContext);
  const { textLoader } = localeContext;

  useEffect(() => {
    if (currentUser) {
      UserRepository
        .getUserBookDataAll(currentUser.uid)
        .then((books) => {
          const bookIds = books.map((book) => book.id);

          BookRepository.getBooks(bookIds).then((result) => {
            setUserBooks(result);
          });
        });
    }
  }, [currentUser]);

  return (
    <>
      {
        currentUser &&
        (
          <>
            {textLoader('Books_You_Read')}
            <BookListView books={userBooks} />
          </>
        )
      }
      {
        !currentUser && (
          <>
            <div>{textLoader('Log_In_Reason_Description')}</div>
            <Link to="/login">
              {textLoader('Log_In_Label')}
            </Link>
          </>
        )
      }
    </>
  );
}

export default UserBookList;
