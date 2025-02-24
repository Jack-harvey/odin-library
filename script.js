const mainElement = document.querySelector("body");
const formElement = document.querySelector("#newBookForm");
const openModalButton = document.querySelector(".open-modal");
const closeModalButton = document.querySelector(".close-modal");
const bookContainer = document.querySelector(".book-container");
const newBookModal = document.querySelector("#newBookModal");
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

function convertDateToFriendlyDate(date) {
  let friendlyDate = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`;
  return friendlyDate;
}
function convertDateToFriendlyTime(date) {
  let friendlyTime = `${date.getHours()}:${date.getMinutes()}`;
  return friendlyTime;
}

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
  addBooksInLibraryToPage();
}

function buttonPressed(target) {
  let classList = target.classList;
  if (classList.contains("open-modal")) {
    newBookModal.showModal();
  }
  if (classList.contains("close-modal")) {
    newBookModal.close();
  }
}

function clearAllBooksFromPage() {
  while (bookContainer.firstChild) {
    bookContainer.removeChild(bookContainer.lastChild);
  }
}

function addABookToPage(book) {
  const bookTitle = document.createElement("div");
  const bookAuthor = document.createElement("div");
  const bookGenre = document.createElement("div");
  const bookPageCount = document.createElement("div");
  const bookDateTime = document.createElement("div");
  const dateAdded = document.createElement("span");
  const timeAdded = document.createElement("span");
  const bookElement = document.createElement("div");
  const deleteButton = document.createElement("button");

  bookTitle.classList.add("title");
  bookAuthor.classList.add("author");
  bookGenre.classList.add("genre");
  bookPageCount.classList.add("page-count");
  bookDateTime.classList.add("date-time");
  dateAdded.classList.add("date-added");
  timeAdded.classList.add("time-added");
  bookElement.classList.add("book");

  bookTitle.appendChild(document.createTextNode(`${book.title}`));
  bookAuthor.appendChild(document.createTextNode(`${book.author}`));
  bookGenre.appendChild(document.createTextNode(`${book.genre}`));
  bookPageCount.appendChild(document.createTextNode(`${book.pageCount}`));
  dateAdded.appendChild(
    document.createTextNode(`${convertDateToFriendlyDate(book.dateAdded)}`)
  );
  timeAdded.appendChild(
    document.createTextNode(`${convertDateToFriendlyTime(book.dateAdded)}`)
  );
  deleteButton.appendChild(document.createTextNode("Delete"));

  bookDateTime.appendChild(dateAdded);
  bookDateTime.appendChild(timeAdded);

  bookElement.appendChild(bookTitle);
  bookElement.appendChild(bookAuthor);
  bookElement.appendChild(bookGenre);
  bookElement.appendChild(bookPageCount);
  bookElement.appendChild(bookDateTime);
  bookElement.appendChild(deleteButton);
  bookContainer.appendChild(bookElement);
}

function addBooksInLibraryToPage() {
  clearAllBooksFromPage();
  library.forEach((book) => addABookToPage(book));
}

document.addEventListener("DOMContentLoaded", () => {
  mainElement.addEventListener("click", (e) => {
    buttonPressed(e.target);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  formElement.addEventListener("submit", (e) => {
    //e.preventDefault();
    bookFormSubmit(e);
  });
});

addBookToLibrary("mistborn", "sanderson", "fantasy", "1300");
addBookToLibrary("wheel o' time", "robbie jordo", "fantasy", "800");
addBookToLibrary("gardens of moon", "erikson", "fantasy", "1200");
