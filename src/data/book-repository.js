import firebase from 'firebase/app';
import 'firebase/firestore';
import { Book } from '../model/book'

class BookRepository {
  constructor() {
    this.db = firebase.firestore();
  }

  /**
   * @returns { books } - array of object type Book
   */
  get() {
    return this.db.collection("books").get().then((querySnapshot) => {

      return querySnapshot.docs.map((querySnapshotDoc) => {
        const book = new Book();
        book.setQuerySnapshot(querySnapshotDoc);

        return book;
      });
    });
  }
}

export { BookRepository }