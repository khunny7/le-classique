import React, { useState, useEffect } from 'react';
// import firebase from 'firebase/app';
import { Button } from 'react-bootstrap';
import { FilePicker, ImagePicker } from 'react-file-picker';
import { withRouter } from 'react-router-dom';
import BookListView from '../dashboard/book-list-view';
import BookRepository from '../data/book-repository';
import PageHeader from '../components/page-header';

const BooksManager = (props) => {
  const { history } = props;

  const [books, setBooks] = useState([]);
  const [newBookPath, setNewBookPath] = useState(null);
  const [newBookCoverUrl, setNewBookCoverUrl] = useState(null);

  useEffect(() => {
    BookRepository.get().then((result) => {
      setBooks(result);
    });
  }, []);

  const onBookFilePicked = (fileObj) => {
    BookRepository.UploadBookFile(fileObj).then((fileInfo) => {
      setNewBookPath(fileInfo.path);
    });
  };

  const onBookCoverFilePicked = (fileObj) => {
    BookRepository.UploadBookCoverFile(fileObj).then((fileInfo) => {
      BookRepository.GetBookCoverFile(fileInfo.path).then((url) => {
        setNewBookCoverUrl(url);
      });
    });
  }

  return (
    <div className="books-manager-container">
      <PageHeader />
      <BookListView books={books} />
      <div className="book-edit-container">
        <span>File to upload: </span>
        {
          newBookPath &&
          (<span>{newBookPath}</span>)
        }
        {
          !newBookPath &&
          (
            <FilePicker
              extensions={['epub']}
              onChange={onBookFilePicked}
              onError={errMsg => console.error(errMsg)}
            >
              <button>
                Click to upload
              </button>
            </FilePicker>
          )
        }
        <div>Book cover to upload: </div>
        {
          newBookCoverUrl &&
          (<img src={newBookCoverUrl} alt="uploaded book cover" />)
        }
        <FilePicker
          extensions={['jpg', 'jpeg', 'png']}
          onChange={onBookCoverFilePicked}
          onError={errMsg => console.error(errMsg)}
        >
          <button>
            Click to upload book cover
          </button>
        </FilePicker>
      </div>
    </div>
  );
};

export default withRouter(BooksManager);
