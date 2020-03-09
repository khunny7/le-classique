class User {
  constructor(uid, data) {
    this.uid = uid;
    this.data = data;
  }

  setFBuser(fbUser) {
    this.fbUser = fbUser;
  }

  getData() {
    return {
      uid: this.uid,
      displayName: this.fbUser.displayName,
      photoURL: this.fbUser.photoURL,
      email: this.fbUser.email,
      description: this.fbUser.description,
    };
  }
}

const userConverter = {
  toFirestore: (user) => ({
    id: user.uid,
  }),
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);

    return new User(snapshot.id, data);
  },
};

export { User, userConverter };
