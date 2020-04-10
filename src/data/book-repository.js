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
    return bookCollection()
      .withConverter(bookConverter)
      .get()
      .then((querySnapshot) => querySnapshot.docs.map((querySnapshotDoc) => querySnapshotDoc.data()));
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
    if (bookIds && bookIds.length > 0) {
      return bookCollection()
        .where(firebase.firestore.FieldPath.documentId(), 'in', bookIds)
        .withConverter(bookConverter)
        .get()
        .then((qs) => qs.docs.map((doc) => doc.data()));
    }

    return Promise.resolve([]);
  }

  static saveBook(bookObj) {
    return bookCollection()
      .doc(bookObj.id)
      .withConverter(bookConverter)
      .set(bookObj);
  }

  static deleteBook(bookId) {
    return bookCollection()
      .doc(bookId)
      .delete();
  }

  static UploadBookFile(fileObj) {
    const newFileRef = storage().ref(fileObj.name);

    return newFileRef.put(fileObj).then((snapshot) => ({
      name: snapshot.metadata.name,
      path: snapshot.metadata.fullPath,
    }));
  }

  static UploadBookCoverFile(fileObj) {
    const newFileRef = storage().ref(`book-covers/${fileObj.name}`);

    return newFileRef.put(fileObj).then((snapshot) => ({
      name: snapshot.metadata.name,
      path: snapshot.metadata.fullPath,
    }));
  }

  static GetBookCoverFile(path) {
    if (path.indexOf('http') === 0) {
      return new Promise((resolve) => {
        resolve(path);
      });
    }

    return storage().ref(path).getDownloadURL();
  }

  static getBookContent(storageRef) {
    const httpsReference = storage().ref(storageRef);

    return new Promise((resolve) => {
      httpsReference.getDownloadURL().then((url) => {
        resolve(url);
      });
    });
  }
}

export default BookRepository;
