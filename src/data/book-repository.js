import firebase from 'firebase/app';
import 'firebase/firestore';

class BookRepository {
  constructor() {
    this.db = firebase.firestore();
  }
  get() {
    return this.db.collection("books").get().then((querySnapshot) => {

      return querySnapshot.docs;
    });
  }
}

export { BookRepository }