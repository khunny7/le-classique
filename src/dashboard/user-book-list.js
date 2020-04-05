import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useUserContext } from '../context/user-context';
import { useLocaleContext } from '../context/locale-context';
import BookRepository from '../data/book-repository';
import UserRepository from '../data/user-repository';
import BookListView from './book-list-view';

const UserBookList = () => {
  const [userBooks, setUserBooks] = useState([]);
  const { currentUser } = useUserContext();
  const { textLoader, currentLocale } = useLocaleContext();
  const history = useHistory();

  const onBookSelected = (bookId) => {
    history.push(`/book/${bookId}`);
  };

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
        currentUser
        && (
          <>
            <p id="booklist"
              lang={currentLocale}>
              {textLoader('Books_You_Read')}
            </p>
            <BookListView
              books={userBooks}
              onBookSelected={onBookSelected}
            />
          </>
        )
      }
      {
        !currentUser && (
          <>
            <div className="no-user-logged-in">{textLoader('Log_In_Reason_Description')}</div>
            <Link to="/login" lang={currentLocale}>
              {textLoader('Log_In_Label')}
            </Link>
          </>
        )
      }
    </>
  );
};

export default UserBookList;
