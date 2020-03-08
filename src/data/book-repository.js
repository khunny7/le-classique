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
      });
    });
  }

  static updateBookTranslation(bookId, sentenceId, translationId, text) {
    const userId = firebase.auth().currentUser.uid;
    const bookRef = bookCollection().doc(bookId);
    const translationRef = bookRef.collection('sentences').doc(sentenceId).collection('trans').doc(translationId);

    return new Promise((resolve, reject) => {
      translationRef.set({
        text,
        author: userId,
        language: 'ko',
      })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static setBookTranslation(bookId, sentenceId, text) {
    const userId = firebase.auth().currentUser.uid;
    const bookRef = bookCollection().doc(bookId);
    const translationRef = bookRef.collection('sentences').doc(sentenceId).collection('trans');

    return new Promise((resolve, reject) => {
      translationRef.add({
        text,
        author: userId,
        language: 'ko',
      })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static getBookTranslation(bookId, sentenceId, fromCache = false) {
    const getOptions = {
      source: fromCache ? 'cache' : 'default',
    };

    const bookRef = bookCollection().doc(bookId);
    const translationRef = bookRef.collection('sentences').doc(sentenceId).collection('trans');

    return new Promise((resolve) => {
      translationRef.get(getOptions)
        .then(((qsnap) => {
          if (qsnap.size > 0) {
            resolve({
              text: qsnap.docs[0].data().text,
              id: qsnap.docs[0].id,
              exists: true,
            });
          } else {
            resolve({
              text: '',
              exists: false,
            });
          }
        }));
    });
  }
}

export default BookRepository;
