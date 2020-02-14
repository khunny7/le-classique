class Book {
  constructor() {

  }

  setQuerySnapshot(querySnapshot) {
    this.querySnapshot = querySnapshot;

    this.id = this.querySnapshot.id;
    const data = this.querySnapshot.data();
    this.author = data.author;
    this.description = data.description;
    this.title = data.title;
  }
}

export { Book };