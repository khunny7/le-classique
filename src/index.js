import './style.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';

var app = firebase.initializeApp({
  apiKey: "AIzaSyBU_5F_fi5VIyp3HKdR_CUa5tteCloA16U",
  authDomain: "le-classique.firebaseapp.com",
  databaseURL: "https://le-classique.firebaseio.com",
  projectId: "le-classique",
  storageBucket: "le-classique.appspot.com",
  messagingSenderId: "652577338672",
  appId: "1:652577338672:web:dfafb36d73647d64a084f5",
  measurementId: "G-F44DSEG4QQ"
});

var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    uiShown: () => {},
    signInSuccessWithAuthResult: (authResult, redirectUrl) => {
      return false;
    },
    signInFlow: 'popup',
    signInSuccessUrl: '/',
  }
}

ui.start('#firebaseui-auth-container', uiConfig);

ReactDOM.render( <
  App title = "React Webpack boiler plate with Jake" / > ,
  document.getElementById('app-react-root')
)