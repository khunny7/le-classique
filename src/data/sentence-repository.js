import firebase from 'firebase/app';
import 'firebase/firestore';
import { defaults } from 'lodash';
import UserRepository from './user-repository';

const sentencesRef = () => firebase.firestore().collection('sentences');

const SentenceRepository = {
  setSentenceTranslation: (sentenceId, text) => {
    const userId = firebase.auth().currentUser.uid;
    const translationRef = sentencesRef().doc(sentenceId).collection('trans');

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
  },
  getSentenceTranslation: (sentenceId, fromCache = false) => {
    const getOptions = {
      source: fromCache ? 'cache' : 'default',
    };

    const translationRef = sentencesRef().doc(sentenceId).collection('trans');

    return new Promise((resolve) => {
      translationRef
        .get(getOptions)
        .then(((qsnap) => {
          if (qsnap.size > 0) {
            const firstDocData = qsnap.docs[0].data();
            resolve({
              text: firstDocData.text,
              id: qsnap.docs[0].id,
              authorId: firstDocData.author,
              exists: true,
            });
          } else {
            resolve({
              text: '',
              exists: false,
            });
          }
        }));
    }).then((translationData) => {
      if (translationData.exists) {
        return UserRepository.getUser(translationData.authorId).then((userObj) => {
          const translationWithAuthor = defaults(translationData, { author: userObj.getData() });

          return translationWithAuthor;
        });
      }
      return translationData;
    });
  },
  updateTranslation: (sentenceId, translationId, text) => {
    const userId = firebase.auth().currentUser.uid;
    const translationRef = sentencesRef().doc(sentenceId).collection('trans').doc(translationId);

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
  },
};

export default SentenceRepository;
