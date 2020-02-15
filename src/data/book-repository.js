import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import { bookConverter } from '../model/book';

const bookCollection = () => firebase.firestore().collection('books');
const storage = () => firebase.storage();

class BookRepository {
  /**
   * @returns { books } - array of object type Book
   */
  static get() {
    return bookCollection().withConverter(bookConverter).get().then((querySnapshot) => querySnapshot.docs.map((querySnapshotDoc) => querySnapshotDoc.data()));
  }

  static getBookById(bookId, fromCache = false) {
    const getOptions = {
      source: fromCache ? 'cache' : 'default',
    };

    const docRef = bookCollection().doc(bookId);

    return docRef.withConverter(bookConverter).get(getOptions).then((doc) => doc.data()).catch((error) => {
      // eslint-disable-next-line
      console.error(error);
    });
  }

  static getBookContent(storageUrl) {
    const httpsReference = storage().refFromURL(storageUrl);

    return new Promise((resolve) => {
      httpsReference.getDownloadURL().then((url) => {
        resolve(url);
      // This can be downloaded directly:
      // var xhr = new XMLHttpRequest();
      // xhr.responseType = 'blob';
      // xhr.onload = function(event) {
      //   var blob = xhr.response;
      // };
      // xhr.open('GET', url);
      // xhr.send();
      // });
      });
    });
  }
}

export default BookRepository;
