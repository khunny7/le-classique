import stringToKey from '../utils/stringToKey';

class Book {
  constructor(id, data) {
    this.id = id;
    this.author = data.author;
    this.description = data.description;
    this.title = data.title;
    this.cover = data.cover;
    this.bookData = data.bookData;

    if (!this.id || this.id.length === 0) {
      this.id = stringToKey(`${this.author}${this.title}`);
    }
  }
}

const bookConverter = {
  toFirestore: (book) => ({
    id: book.id,
    author: book.author,
    description: book.description || '',
    title: book.title,
    cover: book.cover,
    bookData: book.bookData,
  }),
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);

    return new Book(snapshot.id, data);
  },
};

export { Book, bookConverter };
