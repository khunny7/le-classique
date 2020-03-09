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

const getUser = (userId, fbUser, fromCache = false) => {
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

          userObj.setFBuser(fbUser);

          return userObj;
        }
        const userObj = new User(userId);

        userObj.setFBuser(fbUser);

        return setUser(userObj.uid, userObj).then(() => userObj);
      },
    ).catch((error) => {
      // eslint-disable-next-line
      console.error(error);
    });
};

const UserRepository = {
  getUser,
  setUser,
};

export default UserRepository;
