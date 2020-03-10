import firebase from 'firebase/app';
import 'firebase/firestore';
import { userConverter, User } from '../model/user';

const getUserCollection = () => firebase.firestore().collection('users');

const setUser = (userId, userObject) => {
  const userRef = getUserCollection().doc(userId);

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
};

const setUserBookData = (userId, bookId, bookData) => {
  const userRef = getUserCollection().doc(userId);
  const bookDataRef = userRef.collection('userBookData').doc(bookId);

  return bookDataRef.set(bookData);
};

const getUserBookData = (userId, bookId) => {
  const userRef = getUserCollection().doc(userId);
  const bookDataRef = userRef.collection('userBookData').doc(bookId);

  return bookDataRef.get()
    .then(
      (doc) => {
        if (doc.exists) {
          return doc.data();
        } else {
          return null;
        }
      }
    );
};

const getUser = (userId, fromCache = false) => {
  const getOptions = {
    source: fromCache ? 'cache' : 'default',
  };

  const userRef = getUserCollection().doc(userId);

  return userRef
    .withConverter(userConverter)
    .get(getOptions)
    .then(
      (doc) => {
        if (doc.exists) {
          const userObj = doc.data();

          return userObj;
        } else {
          null;
        }
      },
    ).catch((error) => {
      // eslint-disable-next-line
      console.error(error);
    });
};

const getUserAndSet = (userId, fbUser, fromCache = false) => {
  return getUser(userId, fromCache).then((userData) => {
    if (userData) {
      userData.setFBuser(fbUser);

      return userData;
    } else {
      const userObj = new User(userId);

      userObj.setFBuser(fbUser);

      return setUser(userObj.uid, userObj).then(() => userObj);
    }
  });
};

const UserRepository = {
  getUser,
  setUser,
  getUserAndSet,
  setUserBookData,
  getUserBookData,
};

export default UserRepository;
