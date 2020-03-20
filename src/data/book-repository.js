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

  static getBooks(bookIds) {
    return bookCollection()
      .where(firebase.firestore.FieldPath.documentId(), 'in', bookIds)
      .withConverter(bookConverter)
      .get()
      .then((qs) => qs.docs.map((doc) => doc.data()));
  }

  static UploadBookFile(fileObj) {
    const newFileRef = storage().ref(fileObj.name);

    return newFileRef.put(fileObj).then((snapshot) => {
      return {
        name: snapshot.metadata.name,
        path: snapshot.metadata.fullPath,
      };
    });
  }

  static UploadBookCoverFile(fileObj) {
    const newFileRef = storage().ref(`book-covers/${fileObj.name}`);

    return newFileRef.put(fileObj).then((snapshot) => {
      return {
        name: snapshot.metadata.name,
        path: snapshot.metadata.fullPath,
      };
    });
  }

  static GetBookCoverFile(path) {
    return storage().ref(path).getDownloadURL();
  }

  static getBookContent(storageUrl) {
    const httpsReference = storage().refFromURL(storageUrl);

    return new Promise((resolve) => {
      httpsReference.getDownloadURL().then((url) => {
        resolve(url);
      });
    });
  }
}

export default BookRepository;
