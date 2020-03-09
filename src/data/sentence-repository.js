import firebase from 'firebase/app';
import 'firebase/firestore';

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
