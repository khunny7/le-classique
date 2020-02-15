import firebase from 'firebase/app';
import 'firebase/firestore';
import { Book, bookConverter } from '../model/book';

const bookCollection = () => firebase.firestore().collection('books');

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
      console.error(error);
    });
  }
}

export { BookRepository };
