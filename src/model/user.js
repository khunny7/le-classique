class User {
  constructor(uid, data) {
    this.uid = uid;
    this.data = data || {};
  }

  setFBuser(fbUser) {
    this.fbUser = fbUser;
  }

  getData() {
    return {
      uid: this.uid,
      displayName: this.data.displayName || this.fbUser.displayName,
      photoURL: this.data.photoURL || this.fbUser.photoURL,
      email: this.data.email || this.fbUser.email,
    };
  }
}

const userConverter = {
  toFirestore: (user) => {
    const data = user.getData();

    return {
      id: data.uid,
      displayName: data.displayName,
      photoURL: data.photoURL,
      email: data.email,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);

    return new User(snapshot.id, data);
  },
};

export { User, userConverter };
