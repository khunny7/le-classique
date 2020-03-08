import firebase from 'firebase/app';

let instance = null;
let curCallbackId = 1;

class AuthRepository {
  constructor() {
    this.auth = firebase.auth();
    this.currentUser = this.auth.currentUser;
    this.callbacks = [];

    this.auth.onAuthStateChanged((user) => {
      this.callbacks.forEach((cb) => {
        cb.callbackFunction(user);
      });
    });
  }

  static get() {
    if (!instance) {
      instance = new AuthRepository();
    }

    return instance;
  }

  signOut() {
    this.auth.signOut();
  }

  onUserStateChanged(cb) {
    curCallbackId += 1;

    this.callbacks.push({
      callbackId: curCallbackId,
      callbackFunction: cb,
    });

    return curCallbackId;
  }

  offUserStateChanged(cbId) {
    this.callbacks = this.callbacks.filter((item) => item.callbackId !== cbId);
  }
}

export default AuthRepository;