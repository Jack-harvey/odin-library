const library = [];

function Book(title, author, genre, pageCount) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.pageCount = pageCount;
  this.dateAdded = new Date();
}

function addBookToLibrary(title, author, genre, pageCount) {
  library.push(new Book(title, author, genre, pageCount));
}

addBookToLibrary("xtitle", "xauthor", "xgenre", "xpagecount");
addBookToLibrary("Ytitle", "Yauthor", "Ygenre", "Ypagecount");
addBookToLibrary("Ztitle", "Zauthor", "Zgenre", "Zpagecount");
