class User {
  constructor(uid, displayName, photoURL, email, description) {
    this.uid = uid;
    this.displayName = displayName;
    this.photoURL = photoURL;
    this.email = email;
    this.description = description;
  }
}

const userConverter = {
  toFirestore: (user) => ({
    id: book.id,
    author: book.author,
    description: book.description,
    title: book.title,
    cover: book.cover,
    bookData: book.bookData,
  }),
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);

    return new User(snapshot.id, data.displayName, data.photoURL, data.email, data.description);
  },
};

export { User, userConverter };
