class Book {
  constructor(id, author, description, title, cover, bookData) {
    this.id = id;
    this.author = author;
    this.description = description;
    this.title = title;
    this.cover = cover;
    this.bookData = bookData;
  }
}

const bookConverter = {
  toFirestore: (book) => ({
    id: book.id,
    author: book.author,
    description: book.description,
    title: book.title,
    cover: book.cover,
    bookData: book.bookData,
  }),
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);

    return new Book(snapshot.id, data.author, data.description, data.title, data.cover, data.bookData);
  },
};

export { Book, bookConverter };
