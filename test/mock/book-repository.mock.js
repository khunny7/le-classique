class BookRepositoryMock {
  /**
   * @returns { books } - array of object type Book
   */
  static get() {
    return Promise.resolve([]);
  }

  static getBookById(bookId, fromCache = false) {
    return Promise.resolve(null);
  }

  static getBooks(bookIds) {
  }

  static saveBook(bookObj) {
  }

  static deleteBook(bookId) {
  }

  static UploadBookFile(fileObj) {
  }

  static UploadBookCoverFile(fileObj) {
  }

  static GetBookCoverFile(path) {
  }

  static getBookContent(storageRef) {
  }
}

export default BookRepositoryMock;
