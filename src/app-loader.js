import './style.less';
import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import App from './app';
import AuthRepository from './data/auth-repository';

const appLoader = {
  load: () => {
    firebase.initializeApp({
      apiKey: 'AIzaSyBU_5F_fi5VIyp3HKdR_CUa5tteCloA16U',
      authDomain: 'le-classique.firebaseapp.com',
      databaseURL: 'https://le-classique.firebaseio.com',
      projectId: 'le-classique',
      storageBucket: 'le-classique.appspot.com',
      messagingSenderId: '652577338672',
      appId: '1:652577338672:web:dfafb36d73647d64a084f5',
      measurementId: 'G-F44DSEG4QQ',
    });

    // intialize
    AuthRepository.get();

    ReactDOM.render(<App title="React Webpack boiler plate with Jake" />,
      document.getElementById('app-react-root'));
  },
};

export default appLoader;
