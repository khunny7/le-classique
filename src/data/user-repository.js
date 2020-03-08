import firebase from 'firebase/app';
import 'firebase/firestore';
import { userConverter } from '../model/user';

let instance = null;

class UserRepository {
  /**
   * @returns { books } - array of object type Book
   */
  static get() {
    if (instance) {
      instance = new UserRepository();
    }

    this.userCollection = firebase.firestore().collection('users');

    return instance;
  }

  getUserById(userId, fromCache = false) {
    const getOptions = {
      source: fromCache ? 'cache' : 'default',
    };

    const userRef = this.userCollection.doc(userId);

    return userRef.withConverter(userConverter).get(getOptions).then((doc) => doc.data()).catch((error) => {
      // eslint-disable-next-line
      console.error(error);
    });
  }

  static setUser(userId, userObject) {
    const userRef = this.userCollection.doc(userId);

    return new Promise((resolve, reject) => {
      userRef
        .withConverter(userConverter)
        .set(userObject)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export default UserRepository;
