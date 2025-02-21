const mainElement = document.querySelector("body");
const formElement = document.querySelector("#newBookForm");
const library = [];
let bookId = 0;

function Book(title, author, genre, pageCount) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.pageCount = pageCount;
  this.dateAdded = new Date();
  this.id = bookId;
  bookId++;
}

function addBookToLibrary(title, author, genre, pageCount) {
  library.push(new Book(title, author, genre, pageCount));
}

function convertDateToFriendlyDate(date) {}
function convertDateToFriendlyTime(date) {}

function formValidator(title, author, genre, pageCount) {
  if (title === "" || author === "" || genre === "" || isNaN(pageCount)) {
    return false;
  } else return true;
}

function bookFormSubmit(event) {
  let titleSubmit = document.getElementsByName("title")[0].value;
  let authorSubmit = document.getElementsByName("author")[0].value;
  let genreSubmit = document.getElementsByName("genre")[0].value;
  let pageCountSubmit = document.getElementsByName("page-count")[0].value;

  if (formValidator(titleSubmit, authorSubmit, genreSubmit, pageCountSubmit)) {
    addBookToLibrary(titleSubmit, authorSubmit, genreSubmit, pageCountSubmit);
  }
}

function buttonPressed(target) {}

document.addEventListener("DOMContentLoaded", () => {
  mainElement.addEventListener("click", (e) => {
    buttonPressed(e.target);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    bookFormSubmit(e);
  });
});

addBookToLibrary("xtitle", "xauthor", "xgenre", "xpagecount");
addBookToLibrary("Ytitle", "Yauthor", "Ygenre", "Ypagecount");
addBookToLibrary("Ztitle", "Zauthor", "Zgenre", "Zpagecount");
